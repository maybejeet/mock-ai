import { UserRole } from "@/models/enums";
import { z } from "zod";

export const signUpSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: z
        .string()
        .email("Please enter a valid email address")
        .max(255, "Email must be less than 255 characters"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be less than 100 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
    role: z.enum(["student" , "teacher"],),
    college: z
        .string()
        .min(2, "College name must be at least 2 characters")
        .max(100, "College name must be less than 100 characters"),
});

export const signInSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address")
        .max(255, "Email must be less than 255 characters"),
    password: z
        .string()
        .min(1, "Password is required")
        .max(100, "Password must be less than 100 characters"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
