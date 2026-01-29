import { Agent , run } from "@openai/agents"
import {z} from "zod"
import {extractTextFromPdf} from "./extraxt-text-from-pdf"
import {  ResumeSchema } from "@/schemas/resumeSchema"
import fs from "fs";

export async function parseResumeWithAI(filepath : string){
    if (!fs.existsSync(filepath)) {
        console.error("File does not exist at path:", filepath);
        throw new Error(`File not found at path: ${filepath}`);
    }
    console.log("Starting resume parsing for file:", filepath)
    const outputTextEvent = ResumeSchema;
    const extractionResult = await extractTextFromPdf(filepath);
    if (!extractionResult.success || !extractionResult.text) {
        console.error("PDF extraction failed:", extractionResult.error);
        throw new Error(extractionResult.error || "Failed to extract text from PDF");
    }

    console.log("PDF text extracted successfully, length:", extractionResult.text.length);

// const pdfTextExtracter = tool({
//     name: "PDF text extracter",
//     description: "Extracts raw text from the already-downloaded resume PDF",
//     parameters: z.object({ filepath : z.string().describe("file path of the pdf") }),
//     async execute({filepath}){
//         const result = await  extractTextFromPdf(filepath)
//         if (!result.success || !result.text) {
//             console.error("PDF extraction failed:", result.error);
//             return `ERROR: ${result.error || "Failed to extract text from PDF"}`;
//         }
        
//         console.log("PDF text extracted successfully");
//         return result.text;
//     },
    
// })

const pdfAgent = new Agent({
    name: "ATS Resume Parser Agent",
    instructions: `You are a highly accurate ATS (Applicant Tracking System) resume parser.

Your task is to analyze the following resume text and extract structured information in JSON format.

EXTRACTION RULES:
- Extract ONLY information that is explicitly present in the text
- Use null for any fields where information is not found
- DO NOT fabricate, infer, or guess any data
- Preserve exact formatting of emails, phone numbers, URLs
- For skills: Extract exact skill names (programming languages, frameworks, tools, etc.)
- For experience: Include job title, company name, duration, and key responsibilities
- For education: Include degree, institution, and year of completion
- For projects: Include title, brief description, and technologies used
- For contact info: Extract email, phone, LinkedIn, GitHub URLs exactly as written
- For achievements/awards/honors: Only include if explicitly mentioned

IMPORTANT:
- Maintain data accuracy over completeness
- If uncertain about a field, use null
- Do not restructure or rephrase information significantly
- Preserve technical terms and acronyms as-is

Return ONLY valid JSON matching this exact schema (no markdown, no explanations):
{
    "name": "string or null",
    "email": "string or null",
    "phone": "string or null",
    "linkedin": "string or null",
    "github": "string or null",
    "location": "string or null",
    "skills": ["array of strings"],
    "education": [{"degree": "string", "institution": "string", "year": "string or null"}],
    "experience": [{"role": "string", "company": "string", "duration": "string or null", "description": "string or null"}],
    "projects": [{"title": "string", "description": "string or null", "techStack": ["optional array"]}],
    "achievements": ["array of strings or null"],
    "certifications": [{"name": "string", "issuer": "string or null", "year": "string or null"}] or null,
    "awards": [{"title": "string", "issuer": "string or null", "year": "string or null"}] or null,
    "honors": ["array of strings or null"]
}
Extract all details and return ONLY the JSON object.
    `,
    model: "gpt-4o-mini",
    // tools: [pdfTextExtracter],
    outputType: outputTextEvent,
    
})

try {
    const result = await run(
        pdfAgent,
        `Extract and parse all information from this resume text. Follow the schema strictly.

    ===== RESUME TEXT START =====
    ${extractionResult.text}
    ===== RESUME TEXT END =====

    Return complete structured data matching the output schema. Use null for missing fields and empty arrays for sections with no data.`
    );

    const parsedData = result.finalOutput;

    // Validate the parsed data
    return parsedData;
} catch (error) {
    console.error("AI parsing error:", error);
    // Return a minimal valid schema object instead of throwing
    return null;
}
}

