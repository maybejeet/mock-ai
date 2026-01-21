import { Schema, model, Types } from "mongoose";

export interface IResume {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    parsedText: Record<string, unknown>;
}

const ResumeSchema = new Schema<IResume>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        parsedText: { type: Schema.Types.Mixed, required: true },
    },
    { timestamps: true }
);
ResumeSchema.index({ user: 1 }, { unique: true });

export const ResumeModel = model<IResume>("Resume", ResumeSchema);
