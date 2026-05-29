"use client";

import { useState } from "react";

import Image from "next/image";

import Link from "next/link";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {

    const [email, setEmail] =
        useState("");

    const [otp, setOtp] =
        useState("");

    const [step, setStep] =
        useState(1);

    const [loading, setLoading] =
        useState(false);

    const router =
        useRouter();

    // ================= SEND OTP =================
    const handleSendOTP = async (
        e?: React.FormEvent
    ) => {

        e?.preventDefault();

        if (loading) return;

        if (!email.includes("@")) {

            toast.error(
                "Enter valid email ❌"
            );

            return;
        }

        setLoading(true);

        try {

            const res =
                await fetch(
                    "/api/auth/forgot-password",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            email,
                        }),
                    }
                );

            const data =
                await res.json();

            if (res.ok) {

                toast.success(
                    "OTP sent to your email 📩"
                );

                setStep(2);

            } else {

                toast.error(
                    data.message ||
                    "Something went wrong ❌"
                );
            }

        } catch {

            toast.error(
                "Server error ❌"
            );

        } finally {

            setLoading(false);
        }
    };

    // ================= VERIFY OTP =================
    const handleVerifyOTP = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (!otp) {

            toast.error(
                "Enter OTP ❌"
            );

            return;
        }

        setLoading(true);

        try {

            const res =
                await fetch(
                    "/api/auth/verify-otp",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            email,
                            otp,
                        }),
                    }
                );

            const data =
                await res.json();

            if (res.ok) {

                toast.success(
                    "OTP verified ✅"
                );

                router.push(
                    `/reset-password?email=${email}`
                );

            } else {

                toast.error(
                    data.message ||
                    "Invalid OTP ❌"
                );
            }

        } catch {

            toast.error(
                "Server error ❌"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="
            relative
            min-h-screen
            overflow-hidden
            bg-gradient-to-br
            from-slate-950
            via-blue-950
            to-cyan-950
            flex
            items-center
            justify-center
            px-4
            py-8
            sm:px-6
            lg:px-8
        ">

            {/* ================= GLOW EFFECTS ================= */}
            <div className="
                absolute
                top-0 left-0
                w-72 h-72
                bg-cyan-500/20
                rounded-full
                blur-3xl
            "></div>

            <div className="
                absolute
                bottom-0 right-0
                w-72 h-72
                bg-blue-500/20
                rounded-full
                blur-3xl
            "></div>

            {/* ================= CARD ================= */}
            <div className="
                relative z-10
                w-full
                max-w-md
                sm:max-w-lg
            ">

                <div className="
                    backdrop-blur-2xl
                    bg-white/10
                    border border-white/20
                    rounded-3xl
                    shadow-2xl
                    p-5
                    sm:p-8
                ">

                    {/* ================= BRAND SECTION ================= */}
                    <div className="
                        flex
                        items-center
                        justify-center
                        gap-3
                        sm:gap-4
                    ">

                        {/* LOGO */}
                        <div className="
                            flex-shrink-0
                        ">

                            <Image
                                src="/genix-logo.png"
                                alt="Work GeniX Logo"
                                width={80}
                                height={80}
                                priority
                                className="
                                    object-contain
                                    w-14 h-14
                                    sm:w-16 sm:h-16
                                    md:w-20 md:h-20
                                "
                            />

                        </div>

                        {/* BRAND */}
                        <div>

                            <h1 className="
                                text-2xl
                                sm:text-3xl
                                md:text-4xl
                                font-extrabold
                                tracking-wide
                                text-white
                                leading-tight
                            ">

                                Work{" "}

                                <span className="
                                    text-cyan-400
                                ">
                                    GeniX
                                </span>

                            </h1>

                            <p className="
                                text-gray-300
                                text-[10px]
                                sm:text-xs
                                md:text-sm
                                mt-1
                            ">

                                Printing | Designing | Branding

                            </p>

                        </div>

                    </div>

                    {/* ================= HEADING ================= */}
                    <div className="
                        text-center
                        mt-8
                    ">

                        <h2 className="
                            text-2xl
                            sm:text-3xl
                            font-bold
                            text-white
                        ">

                            Forgot Password

                        </h2>

                        <p className="
                            text-gray-300
                            text-sm
                            sm:text-base
                            mt-2
                        ">

                            {step === 1
                                ? "Enter your email to receive OTP"
                                : "Enter the OTP sent to your email"}

                        </p>

                    </div>

                    {/* ================= STEP 1 ================= */}
                    {step === 1 && (

                        <form
                            onSubmit={handleSendOTP}
                            className="
                                mt-8
                                space-y-5
                            "
                        >

                            {/* EMAIL */}
                            <div>

                                <label className="
                                    text-sm
                                    text-gray-300
                                ">

                                    Email Address

                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="
                                        w-full
                                        mt-2
                                        p-3 sm:p-4
                                        rounded-2xl
                                        bg-white/10
                                        border border-white/20
                                        text-white
                                        placeholder-gray-400
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-cyan-400
                                        transition-all
                                        duration-300
                                    "
                                />

                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    w-full
                                    py-3 sm:py-4
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-cyan-500
                                    to-blue-600
                                    hover:scale-[1.02]
                                    active:scale-[0.98]
                                    transition-all
                                    duration-300
                                    text-white
                                    font-semibold
                                    text-base sm:text-lg
                                    shadow-xl
                                    shadow-cyan-500/30
                                "
                            >

                                {loading
                                    ? "Sending OTP..."
                                    : "Send OTP"}

                            </button>

                        </form>
                    )}

                    {/* ================= STEP 2 ================= */}
                    {step === 2 && (

                        <form
                            onSubmit={handleVerifyOTP}
                            className="
                                mt-8
                                space-y-5
                            "
                        >

                            {/* OTP */}
                            <div>

                                <label className="
                                    text-sm
                                    text-gray-300
                                ">

                                    Enter OTP

                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter 6 digit OTP"
                                    value={otp}
                                    onChange={(e) =>
                                        setOtp(
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="
                                        w-full
                                        mt-2
                                        p-3 sm:p-4
                                        rounded-2xl
                                        bg-white/10
                                        border border-white/20
                                        text-white
                                        placeholder-gray-400
                                        tracking-[0.3em]
                                        text-center
                                        text-lg
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-cyan-400
                                        transition-all
                                        duration-300
                                    "
                                />

                            </div>

                            {/* VERIFY BUTTON */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    w-full
                                    py-3 sm:py-4
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-green-500
                                    to-emerald-600
                                    hover:scale-[1.02]
                                    active:scale-[0.98]
                                    transition-all
                                    duration-300
                                    text-white
                                    font-semibold
                                    text-base sm:text-lg
                                    shadow-xl
                                    shadow-green-500/30
                                "
                            >

                                {loading
                                    ? "Verifying..."
                                    : "Verify OTP"}

                            </button>

                            {/* RESEND */}
                            <button
                                type="button"
                                onClick={() =>
                                    handleSendOTP()
                                }
                                className="
                                    w-full
                                    text-cyan-400
                                    text-sm
                                    hover:underline
                                "
                            >

                                Resend OTP

                            </button>

                        </form>
                    )}

                    {/* ================= FOOTER ================= */}
                    <p className="
                        text-center
                        text-gray-300
                        text-sm
                        mt-7
                    ">

                        Back to

                        <Link
                            href="/login"
                            className="
                                text-cyan-400
                                font-semibold
                                ml-1
                                hover:underline
                            "
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}