import { Schema, model, Types } from "mongoose";

export interface IFinalOutput {
    _id: Types.ObjectId;
    sessionId: Types.ObjectId;
    hrScore: number;
    techScore: number;
    finalScore: number;
    weakTopics: string[];
}

const FinalOutputSchema = new Schema<IFinalOutput>(
    {
        sessionId: {
            type: Schema.Types.ObjectId,
            ref: "InterviewSession",
            unique: true,
        },
        hrScore: { type: Number, min: 0, max: 10 },
        techScore: { type: Number, min: 0, max: 10 },
        finalScore: { type: Number, min: 0, max: 10 },
        weakTopics: { type: [String], default: [] },
    },
    { timestamps: true }
);
FinalOutputSchema.index({ sessionId: 1 }, { unique: true });

export const FinalOutputModel = model<IFinalOutput>(
    "FinalOutput",
    FinalOutputSchema
);
