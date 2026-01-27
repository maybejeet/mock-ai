import mongoose, { Schema, model, Types } from "mongoose";
import { InterviewStatus } from "./enums";
import { Mongoose } from "mongoose";

export interface IInterviewSession {
    _id: Types.ObjectId;
    templateId: Types.ObjectId;
    createdById: Types.ObjectId;
    attendedById: Types.ObjectId;
    status: InterviewStatus;
    interviewLink: string;
    startedAt: Date;
    endedAt: Date | null;
}

const InterviewSessionSchema = new Schema<IInterviewSession>(
    {
        templateId: {
            type: Schema.Types.ObjectId,
            ref: "InterviewTemplate",
            required: true,
        },
        createdById: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        attendedById: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        status: {
            type: String,
            enum: Object.values(InterviewStatus),
            required: true,
        },
        interviewLink: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        startedAt: { type: Date, required: true },
        endedAt: { type: Date, default: null },
    },
    { timestamps: true }
);
InterviewSessionSchema.index({ interviewLink: 1 }, { unique: true });
InterviewSessionSchema.index({ studentId: 1 });
InterviewSessionSchema.index({ teacherId: 1 });
InterviewSessionSchema.index({ status: 1 });
InterviewSessionSchema.index({ templateId: 1 });

export const InterviewSessionModel = mongoose.models.InterviewSession || mongoose.model<IInterviewSession>(
    "InterviewSession",
    InterviewSessionSchema
);
