import { auth } from "@clerk/nextjs/server";
import {InterviewTemplateModel} from "@/models/interview_template.models";
import { ca } from "zod/v4/locales";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized access", { status: 401 });
  
  const body = await request.json();
  const { title, role, rounds, techTopics, difficulty, hrEnabled, customQuestions } = body;
  if (!title || !role || !rounds || !techTopics || !difficulty || !hrEnabled || !customQuestions) {
    return new Response("Missing required fields", { status: 400 });
  }
  try {
    const interviewTemplate = await InterviewTemplateModel.create({
      title,
      role,
      rounds,
      techTopics,
      difficulty,
      hrEnabled,
      createdBy: userId,
      customQuestions: customQuestions || [],
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create interview template", { status: 500 });
  }
}
