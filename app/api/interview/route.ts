import { auth } from "@clerk/nextjs/server";
import { InterviewTemplateModel } from "@/models/interview_template.models";
import { Mongoose } from "mongoose";
import { UserModel } from "@/models/user.models";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized access", { status: 401 });

  const body = await request.json();
  const {
    title,
    jobRole,
    company,
    description,
    interviewType,
    difficulty,
    duration,
    access,
    specificEmails,
    videoRecording,
    aiFeedback,
    deadline
  } = body;

  if (!title || !jobRole || !company || !description || !interviewType || !difficulty) {
    return new Response("Missing required fields", { status: 400 });
  }

  try {
    await dbConnect();
    const user = await UserModel.findOne({ clerkId: userId })
    if (!user) return new Response("User not found", { status: 404 });
    const user_id = user._id.toString();

    // Map interview type to rounds
    let rounds;
    if (interviewType === "Technical") {
      rounds = ["Technical"];
    } else if (interviewType === "Behavioral") {
      rounds = ["HR"];
    } else {
      rounds = ["Technical", "HR"];
    }

    const interviewTemplate = await InterviewTemplateModel.create({
      title,
      role: jobRole,
      company,
      description,
      rounds,
      techTopics: [],
      difficulty,
      duration: duration || 15,
      hrEnabled: rounds.includes("HR"),
      customQuestions: [],
      createdBy: user_id,
      accessType: access || "link",
      allowedEmails: access === "emails" && specificEmails ? specificEmails.split(",").map((e: string) => e.trim()) : [],
      videoRecording: videoRecording !== undefined ? videoRecording : true,
      aiFeedback: aiFeedback !== undefined ? aiFeedback : true,
      deadline: deadline ? new Date(deadline) : undefined,
      responseCount: 0,
    });

    if (interviewTemplate) {
      await UserModel.findByIdAndUpdate(user_id, { $inc: { interviewsCreated: 1 } });
    }

    return new Response(JSON.stringify(interviewTemplate), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error creating interview:", error);
    return new Response(JSON.stringify({ error: "Failed to create interview template" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized access", { status: 401 });

  try {
    await dbConnect();
    const user = await UserModel.findOne({ clerkId: userId });

    // If user doesn't exist yet, return empty array instead of error
    if (!user) {
      console.log("User not found in database, returning empty interviews");
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const user_id = user._id.toString();
    const interviewTemplates = await InterviewTemplateModel.find({ createdBy: user_id });

    return new Response(JSON.stringify(interviewTemplates), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch interview templates" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
