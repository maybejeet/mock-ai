import mongoose, { Schema, model, Types } from "mongoose";
import { Difficulty, InterviewRound } from "./enums";

export interface IInterviewTemplate {
    _id: Types.ObjectId;
    title: string;
    createdBy: Types.ObjectId;
    role: string;
    company: string;
    description: string;
    rounds: InterviewRound[];
    techTopics: string[];
    difficulty: Difficulty;
    duration: number;
    hrEnabled: boolean;
    customQuestions: string[];
    accessType: "self" | "link" | "emails";
    allowedEmails?: string[];
    videoRecording: boolean;
    aiFeedback: boolean;
    deadline?: Date;
    responseCount: number;
}

const InterviewTemplateSchema = new Schema<IInterviewTemplate>(
    {
        title: { type: String, required: true },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        role: { type: String, required: true },
        company: { type: String, required: true },
        description: { type: String, required: true },
        rounds: {
            type: [String],
            enum: Object.values(InterviewRound),
            required: true,
        },
        techTopics: { type: [String], default: [] },
        difficulty: {
            type: String,
            enum: Object.values(Difficulty),
            required: true,
        },
        duration: { type: Number, required: true, default: 15 },
        hrEnabled: { type: Boolean, default: true },
        customQuestions: { type: [String], default: [] },
        accessType: {
            type: String,
            enum: ["self", "link", "emails"],
            required: true,
            default: "link",
        },
        allowedEmails: { type: [String], default: [] },
        videoRecording: { type: Boolean, default: true },
        aiFeedback: { type: Boolean, default: true },
        deadline: { type: Date },
        responseCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);
// InterviewTemplateSchema.index({ createdBy: 1 });
InterviewTemplateSchema.index({ role: 1 });
// InterviewTemplateSchema.index({ difficulty: 1 });
export const InterviewTemplateModel = mongoose.models.InterviewTemplate<IInterviewTemplate> || mongoose.model<IInterviewTemplate>(
    "InterviewTemplate",
    InterviewTemplateSchema
);
