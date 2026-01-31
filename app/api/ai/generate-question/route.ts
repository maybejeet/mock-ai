import dbConnect from "@/lib/dbConnect";
import { InterviewSessionModel } from "@/models/interview_session.models";
import { IInterviewTemplate, InterviewTemplateModel } from "@/models/interview_template.models";
import { ResumeModel } from "@/models/resume.models";
import { generateTechnicalAiQuestion } from "@/services/generate-questions";

export async function POST(request: Request) {
    const { userResponse } = await request.json();
    if (!userResponse) {
        return new Response("User response is required", { status: 400 })
    }
    const url = new URL(request.url);
    const interviewSessionId = url.pathname.split("/").pop();
    try {
        const interviewSession = await InterviewSessionModel.findById(interviewSessionId)
        if (!interviewSession) {
            return new Response("Interview session not found", { status: 404 })
        }
        const templateId = interviewSession.templateId;
        const interviewTemplate: IInterviewTemplate | null = await InterviewTemplateModel.findById(templateId)
        if (!interviewTemplate) {
            return new Response("Interview template not found", { status: 404 })
        }
        const description = interviewTemplate.description
        const title = interviewTemplate.title
        const difficulty = interviewTemplate.difficulty
        const hrEnabled = interviewTemplate.hrEnabled
    
        //Get the user resume
        const resume = await ResumeModel.findById(interviewSession.attendedById)
        if(!resume){
            return new Response("Resume not found", { status: 404 })
        }
        const resumeProjects = resume.parsedText.projects
    
        //Calling the generateTechnicalAiQuestion function
        const technicalAiQuestion = await generateTechnicalAiQuestion({
            jobDescription: description,
            jobTitle: title,
            difficultyLevel: difficulty,
            hrEnabled: hrEnabled,
            resumeProjects: resumeProjects,
            userQuery: userResponse,
        })  
        return Response.json({ data: technicalAiQuestion }, { status: 200 })
    } catch (error) {
        console.log("Error generating question", error);
        return new Response("Error generating question", { status: 500 })
    }  
}