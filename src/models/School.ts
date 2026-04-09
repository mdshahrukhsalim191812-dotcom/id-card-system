import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            enum: ["school", "admin"],
            default: "school",
        },

        // 🔥 TEMPLATE SYSTEM
        templateId: {
            type: String,
            default: "new-era", // 👈 IMPORTANT
        },

        templateImage: {
            type: String,
            default: "/templates/new-era.jpeg", // 👈 IMPORTANT
        },

        templateConfig: {
            type: Object,
            default: {},
        },

        resetOTP: String,
        resetOTPExpiry: Date,
    },
    { timestamps: true }
);

// 🔐 Hide password
SchoolSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.models.School ||
    mongoose.model("School", SchoolSchema);