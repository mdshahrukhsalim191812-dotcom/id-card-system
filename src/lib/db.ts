import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB is already connected ✅");
            return;
        }

        await mongoose.connect(process.env.MONGO_URI as string);
    } catch (error) {
        console.error("MongoDB Error ❌", error);
    }
};