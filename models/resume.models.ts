import mongoose, { Schema, Types } from "mongoose";

export interface IResume {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    parsedText: Record<string, unknown>;
}

const ResumeSchema = new Schema<IResume>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
           // required: true,
            unique: true,
        },
        parsedText: { type: Schema.Types.Mixed, required: true },
    },
    { timestamps: true }
);


export const ResumeModel = mongoose.models.Resume<IResume> || mongoose.model<IResume>("Resume", ResumeSchema);
