import {InterviewTemplateModel} from "@/models/interview_template.models"

export async function POST(req: Request){
    const { title, role, rounds, techTopics, difficulty} = await req.json();
    if(!title || !role || !rounds || !techTopics || !difficulty ){
        throw new Error("Missing required fields");
    }

}