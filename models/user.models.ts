import { Schema, model, Types } from "mongoose";
import { UserRole } from "./enums";
export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string | null;
    role: UserRole;
    collegeId: Types.ObjectId;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        password: { type: String, default: null },
        role: { type: String, enum: Object.values(UserRole), required: true },
        collegeId: {
            type: Schema.Types.ObjectId,
            ref: "College",
            required: true,
        },
    },
    { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ collegeId: 1 });

export const UserModel = model<IUser>("User", UserSchema);
