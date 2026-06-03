"use client";

import {
    useState,
    useEffect,
} from "react";

import Image from "next/image";

import toast from "react-hot-toast";

import {
    ShieldCheck,
} from "lucide-react";

export default function VerifyRegisterOTPPage() {

    const [otp, setOtp] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    // ================= PROTECT PAGE =================

    useEffect(() => {

        const tempRegister =
            sessionStorage.getItem(
                "tempRegister"
            );

        // ❌ NO REGISTER SESSION
        if (!tempRegister) {

            window.location.href =
                "/register";
        }

    }, []);

    // ================= VERIFY OTP =================

    const handleVerify =
        async (
            e?: React.FormEvent
        ) => {

            if (e) e.preventDefault();

            if (loading) return;

            try {

                setLoading(true);

                // 🔥 GET TEMP REGISTER
                const tempRegister =
                    sessionStorage.getItem(
                        "tempRegister"
                    );

                if (!tempRegister) {

                    toast.error(
                        "Register session expired ❌"
                    );

                    return;
                }

                const registerData =
                    JSON.parse(
                        tempRegister
                    );

                // 🔥 VERIFY OTP
                const otpRes =
                    await fetch(
                        "/api/verify-otp",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body: JSON.stringify({

                                email:
                                    registerData.email,

                                otp,
                            }),
                        }
                    );

                const otpData =
                    await otpRes.json();

                // ❌ OTP INVALID
                if (!otpRes.ok) {

                    toast.error(
                        otpData.message ||
                        "Invalid OTP ❌"
                    );

                    return;
                }

                // 🔥 FINAL REGISTER
                const registerRes =
                    await fetch(
                        "/api/auth/register",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body: JSON.stringify(
                                registerData
                            ),
                        }
                    );

                const data =
                    await registerRes.json();

                // ❌ REGISTER FAILED
                if (!registerRes.ok) {

                    toast.error(
                        data.message ||
                        "Registration failed ❌"
                    );

                    return;
                }

                // 🔥 CLEAR SESSION
                sessionStorage.removeItem(
                    "tempRegister"
                );

                toast.success(
                    "Account created successfully ✅"
                );

                // 🔥 REDIRECT
                setTimeout(() => {

                    window.location.href =
                        "/login";

                }, 1500);

            } catch (error) {

                console.log(error);

                toast.error(
                    "Something went wrong ❌"
                );

            } finally {

                setLoading(false);
            }
        };

    // ================= LOADING UI =================

    if (loading) {

        return (

            <div className="
                fixed inset-0
                bg-gradient-to-br
                from-slate-950
                via-blue-950
                to-cyan-950
                flex items-center
                justify-center
                overflow-hidden
                z-50
            ">

                {/* GLOW */}
                <div className="
                    absolute
                    w-[350px]
                    h-[350px]
                    bg-cyan-500/20
                    rounded-full
                    blur-3xl
                    animate-pulse
                "></div>

                <div className="
                    absolute
                    w-[300px]
                    h-[300px]
                    bg-blue-500/20
                    rounded-full
                    blur-3xl
                    bottom-10
                    right-10
                "></div>

                {/* CONTENT */}
                <div className="
                    relative z-10
                    flex flex-col
                    items-center
                ">

                    {/* ICON */}
                    <div className="relative">

                        <div className="
                            absolute inset-0
                            rounded-full
                            bg-cyan-400
                            blur-2xl
                            opacity-40
                            animate-pulse
                        "></div>

                        <div className="
                            relative
                            w-28 h-28
                            rounded-full
                            bg-white/10
                            border border-white/20
                            backdrop-blur-xl
                            flex items-center
                            justify-center
                            shadow-2xl
                        ">

                            <ShieldCheck
                                size={50}
                                className="
                                    text-white
                                    animate-pulse
                                "
                            />

                        </div>

                    </div>

                    {/* DOTS */}
                    <div className="
                        mt-10
                        flex gap-3
                    ">

                        <div className="
                            w-4 h-4
                            rounded-full
                            bg-white
                            animate-bounce
                        "></div>

                        <div className="
                            w-4 h-4
                            rounded-full
                            bg-white
                            animate-bounce
                            [animation-delay:0.2s]
                        "></div>

                        <div className="
                            w-4 h-4
                            rounded-full
                            bg-white
                            animate-bounce
                            [animation-delay:0.4s]
                        "></div>

                    </div>

                    {/* TEXT */}
                    <h2 className="
                        mt-8
                        text-3xl sm:text-4xl
                        font-extrabold
                        text-white
                        tracking-wide
                    ">
                        Verifying OTP...
                    </h2>

                    <p className="
                        mt-3
                        text-blue-100
                        text-center
                        text-sm sm:text-base
                        max-w-md
                        leading-relaxed
                    ">
                        Please wait while we
                        securely verifying owner OTP.
                    </p>

                </div>

            </div>
        );
    }

    // ================= MAIN UI =================

    return (

        <div className="
            relative
            min-h-screen
            overflow-hidden
            bg-gradient-to-br
            from-slate-950
            via-blue-950
            to-cyan-950
            flex items-center
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

                    {/* ================= BRAND ================= */}

                    <div className="
                        flex
                        items-center
                        justify-center
                        gap-3
                        sm:gap-4
                    ">

                        {/* LOGO */}

                        <div className="flex-shrink-0">

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

                        {/* TEXT */}

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

                            Verify Register OTP

                        </h2>

                        <p className="
                            text-gray-300
                            text-sm
                            sm:text-base
                            mt-2
                        ">

                            Enter owner verification OTP

                        </p>

                    </div>

                    {/* ================= FORM ================= */}

                    <form
                        onSubmit={handleVerify}
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

                                Enter OTP / Contact Owner to get OTP

                            </label>

                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) =>
                                    setOtp(
                                        e.target.value
                                    )
                                }
                                required
                                maxLength={6}
                                className="
                                    w-full
                                    mt-2
                                    p-4
                                    rounded-2xl
                                    bg-white/10
                                    border border-white/20
                                    text-white
                                    placeholder-gray-400
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-cyan-400
                                    text-center
                                    tracking-[10px]
                                    text-2xl
                                    font-bold
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

                            Verify OTP

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}