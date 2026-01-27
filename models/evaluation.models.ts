import mongoose, {Schema, model, Types} from "mongoose";
import {InterviewRound} from "./enums";

export interface IEvaluation {
    _id: Types.ObjectId;
    qaItemId: Types.ObjectId;
    round: InterviewRound;
    correctness: number;
    clarity: number;
    confidence: number;
    missingPoints: string[];
}

const EvaluationSchema = new Schema<IEvaluation>(
    {
        qaItemId: { type: Schema.Types.ObjectId, ref: "QAItem", index: true },
        round: {
            type: String,
            enum: Object.values(InterviewRound),
            required: true,
        },
        correctness: { type: Number, min: 0, max: 1, required: true },
        clarity: { type: Number, min: 0, max: 1, required: true },
        confidence: { type: Number, min: 0, max: 1, required: true },
        missingPoints: { type: [String], default: [] },
    },
    { timestamps: true }
);
EvaluationSchema.index({ qaItemId: 1 }, { unique: true });
EvaluationSchema.index({ round: 1 });

export const EvaluationModel = mongoose.models.Evaluation<IEvaluation> || model<IEvaluation>(
    "Evaluation",
    EvaluationSchema
);
