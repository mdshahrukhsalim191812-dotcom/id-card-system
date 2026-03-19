import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
}, { timestamps: true });

export default mongoose.models.School || mongoose.model("School", SchoolSchema);