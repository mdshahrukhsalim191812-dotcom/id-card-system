import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        const user = await School.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "User not found ❌" },
                { status: 404 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetOTP = undefined;
        user.resetOTPExpiry = undefined;

        await user.save();

        return NextResponse.json({
            success: true,
            message: "Password updated ✅",
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Server error ❌" },
            { status: 500 }
        );
    }
}