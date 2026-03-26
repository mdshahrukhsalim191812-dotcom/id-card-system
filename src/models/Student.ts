import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
    {
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

        template: {
            type: String,
            default: "1"
        },

        schoolId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Student ||
    mongoose.model("Student", StudentSchema);