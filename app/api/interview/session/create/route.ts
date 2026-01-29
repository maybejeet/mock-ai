import dbConnect from "@/lib/dbConnect";
import { auth } from "@clerk/nextjs/server";
import { InterviewTemplateModel } from "@/models/interview_template.models";
import { InterviewSessionModel } from "@/models/interview_session.models";
import { UserModel } from "@/models/user.models";


export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return new Response("Unauthorized access", { status: 401 })  
  const { interviewLink } = await req.json()  
  //Gets the id for the interview template to extract the data out of it
  const id = interviewLink.split("/").pop();
  const url = new URL(interviewLink);
  try {
    dbConnect();
    const InterviewTemplate = await InterviewTemplateModel.findById({ _id: id })
    if (!InterviewTemplate) return new Response("Interview template not found", { status: 404 })
    const { createdBy } = InterviewTemplate
    if (!createdBy) return new Response("Interview template not created by user", { status: 403 })
    const user = await UserModel.findOne({ clerkId: userId })
    const interviewSession = await InterviewSessionModel.create({
      createdById: createdBy,
      attendedById : user._id,
      templateId: InterviewTemplate._id,
      status: "HR_ACTIVE",
      interviewLink: `${url.origin}/interview/take/${id}`,
      startedAt: Date.now(),
      endedAt: null,      
    })
    return new Response(JSON.stringify(interviewSession), { status: 201 })
  } catch (error) {
    console.log("Error creating the interview session", error);
    return new Response("Error creating the interview session", { status: 500 })
  }
}