import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { email, otp } = await req.json();

        // ❌ check empty
        if (!email || !otp) {
            return NextResponse.json(
                { message: "Email and OTP required ❌" },
                { status: 400 }
            );
        }

        // 🔍 find user
        const user = await School.findOne({
            email,
            resetOTP: otp,
            resetOTPExpiry: { $gt: new Date() },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid or expired OTP ❌" },
                { status: 400 }
            );
        }

        // ✅ OTP verified (DO NOT reset password here)
        return NextResponse.json({
            success: true,
            message: "OTP verified ✅",
        });

    } catch (error) {
        console.log("VERIFY OTP ERROR:", error);

        return NextResponse.json(
            { message: "Server error ❌" },
            { status: 500 }
        );
    }
}