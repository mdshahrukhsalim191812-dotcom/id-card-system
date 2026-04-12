import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
    {
        school: {
            type: String,
            required: true,
            trim: true,
        },

        admissionNo: {
            type: String,
            trim: true,
            default: "",
        },

        sec: {
            type: String,
            trim: true,
            default: "",
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        class: {
            type: String,
            required: true,
            trim: true,
        },

        roll: {
            type: String,
            required: true,
            trim: true,
        },

        father: {
            type: String,
            required: true,
            trim: true,
        },

        mother: {
            type: String,
            trim: true,
            default: "",
        },

        phone: {
            type: String,
            trim: true,
            default: "",
        },

        address: {
            type: String,
            trim: true,
            default: "",
        },

        dob: {
            type: Date,
        },

        blood: {
            type: String,
            trim: true,
            default: "",
        },

        image: {
            type: String,
            default: "",
        },

        logo: {
            type: String,
            default: "",
        },

        signature: {
            type: String,
            default: "",
        },

        fileHash: {
            type: String,
            default: "",
        },

        schoolId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School",
            required: true,
        },
    },
    { timestamps: true }
);


// Prevent duplicate student (same roll in same school)
StudentSchema.index({ schoolId: 1, roll: 1 }, { unique: true });

// Prevent duplicate file upload (optional but powerful)
StudentSchema.index({ schoolId: 1, fileHash: 1 });

export default mongoose.models.Student ||
    mongoose.model("Student", StudentSchema);