import mongoose, {
    Schema,
    models,
    model,
} from "mongoose";

const otpSchema = new Schema(

    {

        email: {

            type: String,

            required: true,
        },

        otp: {

            type: String,

            required: true,
        },

        expiresAt: {

            type: Date,

            required: true,
        },

        verified: {

            type: Boolean,

            default: false,
        },

    },

    {

        timestamps: true,
    }
);

const Otp =
    models.Otp ||
    model("Otp", otpSchema);

export default Otp;