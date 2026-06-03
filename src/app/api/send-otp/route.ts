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
        font-family:Arial,sans-serif;
        background:#f4f7fb;
        padding:30px;
    "
><div
    style="
        max-width:600px;
        min-width:350px;
        width:100%;
        margin:auto;
        background:white;
        border-radius:16px;
        overflow:hidden;
        box-shadow:0 10px 30px rgba(0,0,0,0.08);
    "
>

    <!-- HEADER -->

    <div
        style="
            background:linear-gradient(135deg,#021B33,#063B6E);
            padding:30px;
            text-align:center;
        "
    >

        <img
            src="https://workgenix.in/genix-logo.png"
            alt="Work GeniX"
            width="90"
            style="
                display:block;
                margin:auto;
            "
        />

        <h1
            style="
                color:white;
                margin-top:15px;
                margin-bottom:0;
            "
        >
            Work GeniX
        </h1>

        <p
            style="
                color:#cbd5e1;
                margin-top:8px;
            "
        >
            Printing | Designing | Branding
        </p>

    </div>

    <!-- BODY -->

    <div
        style="
            padding:35px;
            text-align:center;
        "
    >

        <h2
            style="
                color:#021B33;
                margin-bottom:10px;
            "
        >
            Owner Verification OTP
        </h2>

        <p
            style="
                color:#64748b;
                font-size:15px;
            "
        >
            OTP requested for:
            <b>${email}</b>
        </p>

        <div
            style="
                margin:30px auto;
                width:fit-content;
                background:#eff6ff;
                border:2px dashed #3b82f6;
                padding:20px 30px;
                border-radius:16px;
            "
        >

            <span
                style="
                    font-size:34px;
                    font-weight:800;
                    letter-spacing:8px;
                    color:#0f172a;
                    align-items:center
                "
            >
                ${otp}
            </span>

        </div>

        <p
            style="
                color:#64748b;
                font-size:14px;
            "
        >
            This OTP is valid for
            <b>5 minutes</b>.
        </p>

        <p
            style="
                color:#ef4444;
                font-size:13px;
                margin-top:25px;
            "
        >
            If you did not request this OTP,
            please ignore this email.
        </p>

    </div>

    <!-- FOOTER -->

    <div
        style="
            background:#f8fafc;
            padding:20px;
            text-align:center;
            color:#94a3b8;
            font-size:12px;
        "
    >
        © ${new Date().getFullYear()} Work GeniX
        • Secure Authentication System
    </div>

</div>

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