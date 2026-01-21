import { Schema, model, Types } from "mongoose";
import { InterviewStatus } from "./enums";

export interface IInterviewSession {
    _id: Types.ObjectId;
    templateId: Types.ObjectId;
    teacherId: Types.ObjectId;
    studentId: Types.ObjectId;
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
        teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        studentId: {
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

export const InterviewSessionModel = model<IInterviewSession>(
    "InterviewSession",
    InterviewSessionSchema
);
