import { auth } from "@clerk/nextjs/server";
import { InterviewSessionModel } from "@/models/interview_session.models";
import { UserModel } from "@/models/user.models";
import dbConnect from "@/lib/dbConnect";

export async function GET(request: Request) {
    const { userId } = await auth();
    if (!userId) return new Response("Unauthorized access", { status: 401 });

    try {
        await dbConnect();
        const user = await UserModel.findOne({ clerkId: userId });

        if (!user) {
            return new Response(JSON.stringify([]), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        const user_id = user._id.toString();

        // Fetch sessions where the user is the attendee
        const sessions = await InterviewSessionModel.find({ attendedById: user_id })
            .populate("templateId")
            .sort({ createdAt: -1 });

        return new Response(JSON.stringify(sessions), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching taken interviews:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch taken interviews" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
