import { Schema, model, Types } from "mongoose";
import { Difficulty, InterviewRound } from "./enums";

export interface IInterviewTemplate {
    _id: Types.ObjectId;
    title: string;
    createdBy: Types.ObjectId;
    role: string;
    rounds: InterviewRound[];
    techTopics: string[];
    difficulty: Difficulty;
    hrEnabled: boolean;
    customQuestions: string[];
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
        hrEnabled: { type: Boolean, default: true },
        customQuestions: { type: [String], default: [] },
    },
    { timestamps: true }
);
InterviewTemplateSchema.index({ createdBy: 1 });
InterviewTemplateSchema.index({ role: 1 });
InterviewTemplateSchema.index({ difficulty: 1 });
export const InterviewTemplateModel = model<IInterviewTemplate>(
    "InterviewTemplate",
    InterviewTemplateSchema
);
