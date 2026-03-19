import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: String,
    class: String,
    roll: String,
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
    },
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);