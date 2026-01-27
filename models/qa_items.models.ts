import mongoose, { Schema , model , Types } from "mongoose";
import { Difficulty, InterviewRound } from "./enums";

export interface IQAItem {
    _id: Types.ObjectId;
    sessionId: Types.ObjectId;
    round: InterviewRound;
    topic: string;
    difficulty: Difficulty;
    question: {
        text: string;
        askedAt: Date;
    };
    answer: {
        text: string | null;
        answeredAt: Date | null;
    };
}

const QAItemSchema = new Schema<IQAItem>(
    {
        sessionId: {
            type: Schema.Types.ObjectId,
            ref: "InterviewSession",
            index: true,
        },
        round: {
            type: String,
            enum: Object.values(InterviewRound),
            required: true,
        },
        topic: { type: String, required: true },
        difficulty: {
            type: String,
            enum: Object.values(Difficulty),
            required: true,
        },
        question: {
            text: { type: String, required: true },
            askedAt: { type: Date, required: true },
        },
        answer: {
            text: { type: String, default: null },
            answeredAt: { type: Date, default: null },
        },
    },
    { timestamps: true }
);
QAItemSchema.index({ sessionId: 1 });
QAItemSchema.index({ sessionId: 1, round: 1 });
QAItemSchema.index({ topic: 1 });

export const QAItemModel = mongoose.models.QAItem<IQAItem> || mongoose.model<IQAItem>("QAItem", QAItemSchema);
