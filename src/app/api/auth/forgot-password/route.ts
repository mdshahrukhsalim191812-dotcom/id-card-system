import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { email } = await req.json();

        // ❌ check empty email
        if (!email) {
            return NextResponse.json(
                { message: "Email is required ❌" },
                { status: 400 }
            );
        }

        // 🔍 find user
        const user = await School.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "User not found ❌" },
                { status: 404 }
            );
        }

        // 🔐 generate secure token
        const token = crypto.randomBytes(32).toString("hex");

        // ⏳ set expiry (1 hour)
        const expiry = new Date(Date.now() + 60 * 60 * 1000);

        // 💾 save token in DB
        user.resetToken = token;
        user.resetTokenExpiry = expiry;

        await user.save();

        // 🔗 reset link (temporary console)
        const resetLink = `http://localhost:3000/reset-password/${token}`;

        console.log("🔗 RESET LINK:", resetLink);

        return NextResponse.json({
            success: true,
            message: "Reset link generated ✅ (check terminal)",
        });

    } catch (error) {
        console.log("Forgot Password Error:", error);

        return NextResponse.json(
            { message: "Server error ❌" },
            { status: 500 }
        );
    }
}