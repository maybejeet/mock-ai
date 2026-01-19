import { z } from "zod";

export const ResumeSchema = z.object({
    name: z.string().nullable().describe("Full name of the candidate"),

    email: z.string().nullable().describe("Email address"),
    phone: z.string().nullable().describe("Phone number"),
    linkedin: z.string().nullable().describe("LinkedIn profile URL"),
    github: z.string().nullable().describe("GitHub profile URL"),
    location: z.string().nullable().describe("City, State, Country"),
    skills: z.array(z.string()).describe("Technical and soft skills"),
    education: z.array(
        z.object({
        degree: z.string().describe("Degree name"),
        institution: z.string().describe("College or university"),
        year: z.string().nullable().describe("Year of completion")
        })
    ).describe("Educational background"),
    experience: z.array(
        z.object({
        role: z.string().describe("Job title"),
        company: z.string().describe("Company name"),
        duration: z.string().nullable().describe("Employment duration"),
        description: z.string().nullable().describe("Work responsibilities")
        })
    ).describe("Professional experience"),
    projects: z.array(
        z.object({
        title: z.string().describe("Project title"),
        description: z.string().nullable().describe("Project summary"),
        techStack: z.array(z.string()).optional().describe("Technologies used")
        })
    ).describe("Personal or professional projects"),
    achievements: z.array(
        z.string().describe("Major achievements or accomplishments")
    ).nullable().describe("Key achievements"),
    certifications: z.array(
        z.object({
        name: z.string().describe("Certification name"),
        issuer: z.string().nullable().describe("Issuing organization"),
        year: z.string().nullable().describe("Year received")
        })
    ).describe("Professional certifications").nullable(),
    awards: z.array(
        z.object({
        title: z.string().describe("Award title"),
        issuer: z.string().nullable().describe("Awarded by"),
        year: z.string().nullable().describe("Year received")
        })
    ).describe("Awards received").nullable(),
    honors: z.array(
        z.string().describe("Academic or professional honors")
    ).describe("Honors and recognitions").nullable()
});

export type Resume = z.infer<typeof ResumeSchema>;

