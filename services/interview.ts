import { Agent , run} from "@openai/agents"

export async function aiInterview(){
  const interviewAgent = new Agent({
    name: "AI Interview Agent",
    instructions: `You are an AI interviewer. You will ask questions to the user and provide feedback on their answers.`,
  })
const result = await run(interviewAgent,"Hello, how can I assist you today?" )
  return result;
}``