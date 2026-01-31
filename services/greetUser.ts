type GreetUserParams = {
  userName?: string;
  role?: string;
  company?: string;
  interviewType?: "HR" | "TECH" | "BEHAVIORAL";
  durationInMinutes?: number;
};

export function greetUser({
  userName ,
  role ,
  company ,
  interviewType ,
  durationInMinutes ,
}: GreetUserParams): string {
  return `
Hi ${userName}  
Welcome to your ${interviewType} interview for the ${role} position at ${company}.
This interview will take approximately ${durationInMinutes} minutes.  
I’ll be asking you a series of questions to understand your experience, problem-solving approach, and communication skills.
Here’s how you can prepare right now:
• Answer clearly and honestly  
• Take a moment to think before responding  
• Feel free to ask for clarification if needed  
• Treat this like a real interview — stay calm and confident  

Whenever you’re ready, we can start the interview.
`;
}
