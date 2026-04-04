import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

        // 🔐 generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // ⏳ expiry (5 min)
        const expiry = new Date(Date.now() + 5 * 60 * 1000);

        // 💾 save OTP
        user.resetOTP = otp;
        user.resetOTPExpiry = expiry;

        await user.save();

        // 📧 EMAIL SETUP
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 📧 SEND EMAIL
        await transporter.sendMail({
            from: `"Work GeniX" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Your OTP Code",
            html: `
                <h2>Password Reset OTP</h2>
                <p>Your OTP is:</p>
                <h1 style="font-size:24px; letter-spacing:5px;">${otp}</h1>
                <p>This OTP expires in 5 minutes.</p>
            `,
        });

        return NextResponse.json({
            success: true,
            message: "OTP sent to your email ✅",
        });

    } catch (error) {
        console.log("Forgot Password Error:", error);

        return NextResponse.json(
            { message: "Server error ❌" },
            { status: 500 }
        );
    }
}