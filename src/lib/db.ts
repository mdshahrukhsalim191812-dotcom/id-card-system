import mongoose from "mongoose";

const MONGODB_URI =
    process.env.MONGODB_URI as string;

if (!MONGODB_URI) {

    throw new Error(
        "Please define MONGODB_URI"
    );
}

// 🔥 GLOBAL CACHE
let cached = (global as any).mongoose;

if (!cached) {

    cached = (global as any).mongoose = {
        conn: null,
        promise: null,
    };
}

export const connectDB = async () => {

    // ✅ ALREADY CONNECTED
    if (cached.conn) {

        console.log(
            "MongoDB Already Connected ✅"
        );

        return cached.conn;
    }

    // ✅ CREATE CONNECTION
    if (!cached.promise) {

        console.log(
            "Connecting MongoDB..."
        );

        cached.promise =
            mongoose.connect(
                MONGODB_URI,
                {
                    bufferCommands: false,
                }
            )
                .then((mongoose) => {

                    console.log(
                        "MongoDB Connected ✅"
                    );

                    return mongoose;
                });
    }

    try {

        cached.conn =
            await cached.promise;

    } catch (error) {

        cached.promise = null;

        console.error(
            "MongoDB Error ❌",
            error
        );

        throw error;
    }

    return cached.conn;
};