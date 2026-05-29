import mongoose from "mongoose";

const MONGODB_URI =
    process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error(
        "Please define MONGODB_URI"
    );
}

export const connectDB = async () => {

    try {

        if (
            mongoose.connection.readyState >= 1
        ) {
            return;
        }

        await mongoose.connect(
            MONGODB_URI
        );

    } catch (error) {

        console.error(
            "MongoDB Error ❌",
            error
        );

        throw error;
    }
};