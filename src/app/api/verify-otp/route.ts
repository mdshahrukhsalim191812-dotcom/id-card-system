import { connectDB } from "@/lib/db";

import OTP from "@/models/Otp";

import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {

        // ================= BODY =================
        const body = await req.json();

        const {
            email,
            otp,
        } = body;

        // ================= VALIDATION =================
        if (!email || !otp) {

            return NextResponse.json(
                {
                    message:
                        "Email and OTP required ❌",
                },
                {
                    status: 400,
                }
            );
        }

        // ================= DATABASE =================
        await connectDB();

        // ================= FIND OTP =================
        const existingOTP =
            await OTP.findOne({
                email,
                otp,
            });

        // ❌ INVALID OTP
        if (!existingOTP) {

            return NextResponse.json(
                {
                    message:
                        "Invalid OTP ❌",
                },
                {
                    status: 400,
                }
            );
        }

        // ❌ EXPIRED OTP
        if (
            existingOTP.expiresAt <
            new Date()
        ) {

            return NextResponse.json(
                {
                    message:
                        "OTP expired ❌",
                },
                {
                    status: 400,
                }
            );
        }

        // ✅ DELETE OTP AFTER SUCCESS
        await OTP.deleteOne({
            _id: existingOTP._id,
        });

        // ✅ SUCCESS
        return NextResponse.json({
            success: true,
            message:
                "OTP verified successfully ✅",
        });

    } catch (error) {

        console.log(
            "VERIFY OTP ERROR ❌",
            error
        );

        return NextResponse.json(
            {
                message:
                    "Server Error ❌",
            },
            {
                status: 500,
            }
        );
    }
}