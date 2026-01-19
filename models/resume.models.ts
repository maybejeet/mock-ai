import mongoose from "mongoose";

interface Resume{
    parsedData : object
}

//TODO: Add proper schema with user details also

const ResumeSchema = new mongoose.Schema<Resume>(
    {
    parsedData: { type: Object, required: true }
    },
    { timestamps: true }
);

export const Resume = mongoose.models.Resume <Resume> || mongoose.model("Resume", ResumeSchema);
