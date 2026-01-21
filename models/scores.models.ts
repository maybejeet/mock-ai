import {Schema, model, Types} from "mongoose";
import {InterviewRound} from "./enums";
export interface IScore {
    _id: Types.ObjectId;
    qaItemId: Types.ObjectId;
    evaluationId: Types.ObjectId | null;
    round: InterviewRound;
    score: number;
    penalties: string[];
}

const ScoreSchema = new Schema<IScore>(
    {
        qaItemId: { type: Schema.Types.ObjectId, ref: "QAItem", index: true },
        evaluationId: {
            type: Schema.Types.ObjectId,
            ref: "Evaluation",
            default: null,
        },
        round: {
            type: String,
            enum: Object.values(InterviewRound),
            required: true,
        },
        score: { type: Number, min: 0, max: 10, required: true },
        penalties: { type: [String], default: [] },
    },
    { timestamps: true }
);
ScoreSchema.index({ qaItemId: 1 }, { unique: true });
ScoreSchema.index({ round: 1 });

export const ScoreModel = model<IScore>("Score", ScoreSchema);
