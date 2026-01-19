import fs from "fs";
import path from "path";

type DownloadResult = {
    success: boolean;
    data: string | null;
    message?: string;
    error?: string;
};

export async function downloadFile(url: string): Promise<DownloadResult> {
    try {
        console.log("Downloading file from:", url);
        const res = await fetch(url);
        
        if (!res.ok) {
            return {
                success: false,
                data: null,
                error: `Failed to fetch file: ${res.statusText}`
            };
        }

        const buffer = Buffer.from(await res.arrayBuffer());
        
        // Ensure /tmp directory exists
        const tmpDir = "/tmp";
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }
        
        const filePath = path.join(tmpDir, `resume_${Date.now()}.pdf`);
        fs.writeFileSync(filePath, buffer);
        
        console.log("File downloaded successfully to:", filePath);
        console.log("File exists:", fs.existsSync(filePath));
        console.log("File size:", fs.statSync(filePath).size, "bytes");
        
        return {
            success: true,
            data: filePath,
            message: "Successfully downloaded from Cloudinary"
        };
    } catch (error) {
        console.error("Download error:", error);
        return {
            success: false,
            data: null,
            error: error instanceof Error ? error.message : "Download failed"
        };
    }
}

export function cleanupFile(filePath: string): void {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Cleaned up temporary file: ${filePath}`);
        }
    } catch (error) {
        console.error(`Failed to cleanup file ${filePath}:`, error);
    }
}
