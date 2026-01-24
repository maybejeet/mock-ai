import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/dbConnect";
import { ResumeModel } from "@/models/resume.models";
import { downloadFile, cleanupFile } from "@/lib/downloadFile";
import { parseResumeWithAI } from "@/services/parse-resume-with-ai";
import { Mongoose } from "mongoose";

// 5MB file size limit
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
    let localFilePath: string | null = null;
    let cloudinaryPublicId: string | null = null;

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        // Validate file type
        if (!file || file.type !== "application/pdf") {
            return NextResponse.json(
                { error: "Only PDF files allowed", success: false },
                { status: 400 }
            );
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`, success: false },
                { status: 400 }
            );
        }

        // 1️⃣ Upload to Cloudinary (TEMP)
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const upload = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: "raw", folder: "temp-resumes" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        cloudinaryPublicId = upload.public_id;
        console.log("File uploaded to Cloudinary");

        // 2️⃣ Download PDF locally
        const downloadResult = await downloadFile(upload.secure_url);
        if (!downloadResult.success || !downloadResult.data) {
            throw new Error(downloadResult.error || "Failed to download file");
        }
        localFilePath = downloadResult.data;

        // 3️⃣ Parse Resume (Agent-based)
        const parsedResume = await parseResumeWithAI(localFilePath);

        // Check if parsing was successful
        if (!parsedResume || !parsedResume.name) {
            return NextResponse.json(
                { 
                    error: "Failed to extract resume data. The PDF might be corrupted, image-based, or improperly formatted.", 
                    success: false 
                },
                { status: 422 }
            );
        }

        // 4️⃣ Store in MongoDB
        await dbConnect();
        const saved = await ResumeModel.create({
          parsedText: parsedResume,
        });
        const result = await ResumeModel.aggregate([
          {
            $match: {
              _id: saved._id,
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $unwind: "$user",
          },
          {
            $project: {
              _id: 0,
              user: 1,
              parsedText: 1,
            },
          },
        ]);

        // 5️⃣ Cleanup: Delete from Cloudinary and local temp file
        if (cloudinaryPublicId) {
            await cloudinary.uploader.destroy(cloudinaryPublicId, {
                resource_type: "raw"
            });
        }
        if (localFilePath) {
            cleanupFile(localFilePath);
        }

        return NextResponse.json(
            {
                success: true,
                resume: result,
                resumeId : saved._id
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Resume parsing error:", error);

        // Cleanup on error
        if (cloudinaryPublicId) {
            try {
                await cloudinary.uploader.destroy(cloudinaryPublicId, {
                    resource_type: "raw"
                });
            } catch (cleanupError) {
                console.error("Cloudinary cleanup failed:", cleanupError);
            }
        }
        if (localFilePath) {
            cleanupFile(localFilePath);
        }

        return NextResponse.json(
            { 
                error: error instanceof Error ? error.message : "Resume parsing failed", 
                success: false 
            },
            { status: 500 }
        );
    }
}
