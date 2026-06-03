import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Otp from "@/models/Otp";

import generateOtp from "@/lib/generateOtp";

import sendEmail from "@/lib/sendEmails";

export async function POST(req: Request) {

    try {

        await connectDB();

        const body = await req.json();

        const { email } = body;

        if (!email) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Email required",
                },
                {
                    status: 400,
                }
            );
        }

        // 🔥 GENERATE OTP
        const otp = generateOtp();

        // ⏰ EXPIRE IN 5 MINUTES
        const expiresAt = new Date(
            Date.now() + 5 * 60 * 1000
        );

        // 🗑️ DELETE OLD OTP
        await Otp.deleteMany({
            email,
        });

        // 💾 SAVE OTP
        await Otp.create({

            email,

            otp,

            expiresAt,

        });

        // 📧 SEND EMAIL
        const emailSent =
            await sendEmail({

                to: process.env.OWNER_EMAIL!,

                subject: "School Panel OTP",

                html: `
                    <div
                        style="
                            font-family:Arial;
                            padding:20px;
                        "
                    >

                        <h2>
                            School Login OTP
                        </h2>

                        <p>
                            OTP for:
                            <b>${email}</b>
                        </p>

                        <h1
                            style="
                                font-size:42px;
                                letter-spacing:5px;
                            "
                        >
                            ${otp}
                        </h1>

                        <p>
                            Valid for 5 minutes.
                        </p>

                    </div>
                `,
            });

        if (!emailSent) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Failed to send OTP",
                },
                {
                    status: 500,
                }
            );
        }

        return NextResponse.json({

            success: true,

            message:
                "OTP sent successfully",
        });

    } catch (error: any) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error.message ||
                    "Server error",
            },
            {
                status: 500,
            }
        );
    }
}