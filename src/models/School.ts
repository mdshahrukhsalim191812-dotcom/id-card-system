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

        templateId: {
            type: String,
            default: "NewEraEnglishSchool", // logical template
        },

        templateImage: {
            type: String,
            default: "/templates/NewEraEnglishSchool.jpeg", // public folder path
        },

        templateConfig: {
            type: Object,
            default: {}, // positions, colors, etc (future powerful feature)
        },

        resetOTP: String,
        resetOTPExpiry: Date,
    },
    { timestamps: true }
);

SchoolSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.models.School ||
    mongoose.model("School", SchoolSchema);