import mongoose, { Schema, model, Types } from "mongoose";
// import { UserRole } from "./enums";
export interface IUser {
    _id: Types.ObjectId;
    clerkId: string;
    name: string;
    email: string;
    // password: string | null;
    interviewsCreated: number;
    interviewsAttended: number;
    // role: UserRole;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        clerkId: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        // password: { type: String, default: null },
        interviewsCreated: { type: Number, default: 0 },
        interviewsAttended: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const UserModel = mongoose.models.User<IUser> || mongoose.model<IUser>("User", UserSchema);
