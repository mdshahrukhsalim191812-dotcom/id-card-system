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

        // 🔥 NEW FIELDS (FOR FORGOT PASSWORD)
        resetToken: {
            type: String,
        },

        resetTokenExpiry: {
            type: Date,
        },
    },
    { timestamps: true }
);

// 🔐 Hide password automatically
SchoolSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.models.School ||
    mongoose.model("School", SchoolSchema);