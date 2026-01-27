
import { auth } from "@clerk/nextjs/server";
import { InterviewTemplateModel } from "@/models/interview_template.models";
import { UserModel } from "@/models/user.models";
import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";

 
export async function GET(request: NextRequest,{ params }: { params: Promise<{ id: string }> }){
    const { userId } = await auth();
    if (!userId) return new Response("Unauthorized access", { status: 401 });

    try {
        await dbConnect();
        const user = await UserModel.findOne({ clerkId: userId });
      if (!user) return new Response("User not found", { status: 404 });
      const {id}  = await params ;
        console.log("Params id:", id);
        const interview = await InterviewTemplateModel.findById(id);
        if (!interview) {
            return new Response("Interview not found", { status: 404 });
        }
        // Check if user owns this interview
        // if (interview.createdBy.toString() !== user._id.toString()) {
        //     return new Response("Unauthorized access to this interview", {
        //         status: 403,
        //     });
        // }
         return new Response(JSON.stringify(interview), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch interview ", { status: 500 });
    }
}
