import mongoose, {Schema, model, Types} from "mongoose";
import {ConfidenceTrend, Difficulty} from "./enums";
export interface ISessionContext {
    _id: Types.ObjectId;
    sessionId: Types.ObjectId;
    strongTopics: string[];
    weakTopics: string[];
    mentionedProjects: string[];
    confidenceTrend: ConfidenceTrend;
    lastDifficulty: Difficulty;
}

const SessionContextSchema = new Schema<ISessionContext>(
    {
        sessionId: {
            type: Schema.Types.ObjectId,
            ref: "InterviewSession",
            unique: true,
        },
        strongTopics: { type: [String], default: [] },
        weakTopics: { type: [String], default: [] },
        mentionedProjects: { type: [String], default: [] },
        confidenceTrend: {
            type: String,
            enum: Object.values(ConfidenceTrend),
            required: true,
        },
        lastDifficulty: {
            type: String,
            enum: Object.values(Difficulty),
            required: true,
        },
    },
    { timestamps: true }
);
SessionContextSchema.index({ sessionId: 1 }, { unique: true });

export const SessionContextModel = mongoose.models.SessionContext<ISessionContext> || mongoose.model<ISessionContext>(
    "SessionContext",
    SessionContextSchema
);
