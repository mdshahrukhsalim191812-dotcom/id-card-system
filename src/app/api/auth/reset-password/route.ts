import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                { message: "Missing data ❌" },
                { status: 400 }
            );
        }

        // 🔍 find user by token
        const user = await School.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: new Date() },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid try again later! ❌" },
                { status: 400 }
            );
        }

        // 🔐 hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        // 🧹 clear token after use
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Password updated successfully ✅",
        });

    } catch (error) {
        console.log("Reset Password Error:", error);

        return NextResponse.json(
            { message: "Server error ❌" },
            { status: 500 }
        );
    }
}