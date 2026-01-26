import { auth } from "@clerk/nextjs/server";
import {InterviewTemplateModel} from "@/models/interview_template.models";
import { Mongoose } from "mongoose";
import { UserModel } from "@/models/user.models";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized access", { status: 401 });
  
  const body = await request.json();
  const { title, role, rounds, techTopics, difficulty, hrEnabled, customQuestions } = body;
  if (!title || !role || !rounds || !techTopics || !difficulty || !hrEnabled || !customQuestions) {
    return new Response("Missing required fields", { status: 400 });
  }
  try {
    await dbConnect();
    const user = await UserModel.findOne({ clerkId: userId })
    if (!user) return new Response("User not found", { status: 404 });
    const user_id = user._id.toString();
    const interviewTemplate = await InterviewTemplateModel.create({
      title,
      role,
      rounds,
      techTopics,
      difficulty,
      hrEnabled,
      createdBy: user_id,
      customQuestions: customQuestions || [],
    });
    if (interviewTemplate) {
      //add +1 to user's interview templates count
      await UserModel.findByIdAndUpdate(user_id, { $inc: { interviewsCreated: 1 } });
    }
    return new Response(JSON.stringify(interviewTemplate), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create interview template", { status: 500 });
  }
}

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized access", { status: 401 });
  
  try {
    await dbConnect();
    const user = await UserModel.findOne({ clerkId: userId })
    if (!user) return new Response("User not found", { status: 404 });
    const user_id = user._id.toString();
    const interviewTemplates = await InterviewTemplateModel.find({ createdBy: user_id });
    // const fetchedInterviewTemplatesData = 
    return new Response(JSON.stringify(interviewTemplates), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch interview templates", { status: 500 });
  }
}
