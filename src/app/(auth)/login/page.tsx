"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
    UserRoundCheck,
} from "lucide-react";

export default function LoginPage() {

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    // ================= HANDLE CHANGE =================
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // ================= HANDLE SUBMIT =================
    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (loading) return;

        try {

            setLoading(true);

            const res = await fetch(
                "/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    credentials: "include",

                    body: JSON.stringify(form),
                }
            );

            const data =
                await res.json();

            // ================= ERROR =================
            if (!res.ok) {

                toast.error(
                    data.message ||
                    "Login failed ❌"
                );

                return;
            }

            // ================= SAVE SCHOOL =================
            localStorage.setItem(
                "schoolId",
                data.school.id
            );

            localStorage.setItem(
                "school",
                JSON.stringify(
                    data.school
                )
            );

            toast.success(
                "Login Successfully ✅"
            );

            // ================= REDIRECT =================
            setTimeout(() => {

                window.location.href =
                    "/dashboard/create-id";

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

                            <UserRoundCheck
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
                        Logging In...
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
                        securely log you in.
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

                    {/* ================= BRAND SECTION ================= */}
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

                        {/* BRAND TEXT */}
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

                            Welcome Back

                        </h2>

                        <p className="
                            text-gray-300
                            text-sm
                            sm:text-base
                            mt-2
                        ">

                            Login to your school dashboard

                        </p>

                    </div>

                    {/* ================= FORM ================= */}
                    <form
                        onSubmit={handleSubmit}
                        className="
                            mt-8
                            space-y-5
                        "
                    >

                        {/* ================= EMAIL ================= */}
                        <div>

                            <label className="
                                text-sm
                                text-gray-300
                            ">

                                Email Address

                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email address"
                                value={form.email}
                                onChange={handleChange}
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

                        {/* ================= PASSWORD ================= */}
                        <div>

                            <label className="
                                text-sm
                                text-gray-300
                            ">

                                Password

                            </label>

                            <div className="
                                relative
                                mt-2
                            ">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Enter password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="
                                        w-full
                                        p-3 sm:p-4
                                        rounded-2xl
                                        bg-white/10
                                        border border-white/20
                                        text-white
                                        placeholder-gray-400
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-cyan-400
                                        pr-12
                                        transition-all
                                        duration-300
                                    "
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-300
                                        hover:text-white
                                        transition
                                    "
                                >

                                    {showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />}

                                </button>

                            </div>

                        </div>

                        {/* ================= FORGOT PASSWORD ================= */}
                        <div className="
                            text-right
                        ">

                            <Link
                                href="/forgot-password"
                                className="
                                    text-sm
                                    text-cyan-400
                                    hover:underline
                                "
                            >
                                Forgot Password?
                            </Link>

                        </div>

                        {/* ================= BUTTON ================= */}
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

                            Login

                        </button>

                    </form>

                    {/* ================= FOOTER ================= */}
                    <p className="
                        text-center
                        text-gray-300
                        text-sm
                        mt-7
                    ">

                        Don’t have an account?

                        <Link
                            href="/register"
                            className="
                                text-cyan-400
                                font-semibold
                                ml-1
                                hover:underline
                            "
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}