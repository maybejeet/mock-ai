import { Agent, run } from "@openai/agents";
import { z } from "zod";

const questionOutputType = z.object({
  question: z.string().describe("The generated question"),
});
export const generateTechnicalAiQuestion = async ({
  jobDescription,
  jobTitle,
  difficultyLevel,
  hrEnabled,
  resumeProjects,
  userQuery,
}: {
  jobDescription: string;
  jobTitle: string;
  difficultyLevel: string;
  hrEnabled: boolean;
    resumeProjects: string;
  userQuery: string;
}) => {
  const generateQuestionsAgent = new Agent({
    name: "Question Generator",
    instructions: `
  You are an AI assistant that creates technical and behavioral interview questions tailored to a specific job role. Your task is to generate one **realistic and relevant** technical question that matches the skill requirements of the job and aligns with the difficulty level provided by the user.
  Job Information:
  - Job Description: ${jobDescription}
  - Job Title: ${jobTitle}
  - Difficulty Level: ${difficultyLevel}
  - HR Enabled: ${hrEnabled}
  - Resume Projects: ${resumeProjects}

  Guidelines:
  HR QUESTIONS (when enabled):
  - Focus on behavioral, situational, and culture-fit questions
  - Evaluate communication skills, problem-solving approach, teamwork, leadership, adaptability, and motivation
  - Ask scenario-based questions relevant to the job role
  - Avoid generic HR questions; customize them based on the job description and role

TECHNICAL QUESTIONS:
- Ask questions directly based on the candidate’s resume
- Deep dive into:
  - Projects mentioned (architecture, decisions, challenges, trade-offs)
  - Technologies, frameworks, and tools listed
  - Real-world problem solving and debugging
- Ask job-specific technical questions aligned with:
  - Required skills in the job description
  - Role expectations
- Include a mix of:
  - Conceptual questions
  - Practical implementation questions
  - “Why did you choose this approach?” follow-ups
  - Edge cases and optimization questions
- Avoid trivia; focus on depth and reasoning

    Output Guidelines:
  - Return only one question at a time.
  - The question should be formatted as markdown.
  - Stop generating output as soon you have provided the full question.
  `,
    outputType: questionOutputType,
  });

  return ((await run(generateQuestionsAgent, userQuery, { stream: true })).toTextStream);
};
