"use client";

import { useState } from "react";
import Link from "next/link";

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

            const data = await res.json();

            // ================= ERROR =================
            if (!res.ok) {

                toast.error(
                    data.message ||
                    "Login failed ❌"
                );

                setLoading(false);

                return;
            }

            // ================= SAVE SCHOOL =================
            localStorage.setItem(
                "schoolId",
                data.school.id
            );

            localStorage.setItem(
                "school",
                JSON.stringify(data.school)
            );

            toast.success(
                "Login Successfully ✅"
            );

            // ================= REDIRECT =================
            setTimeout(() => {

                window.location.href =
                    "/dashboard";

            }, 800);

        } catch (error) {

            console.log(error);

            toast.error(
                "Something went wrong ❌"
            );

            setLoading(false);

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
                from-[#021B33]
                via-[#04284B]
                to-[#063B6E]
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
                    bg-blue-500/20
                    blur-3xl
                    rounded-full
                    animate-pulse
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
                            bg-blue-400
                            blur-2xl
                            opacity-40
                            animate-pulse
                        "></div>

                        <div className="
                            relative
                            w-28 h-28
                            rounded-full
                            bg-white/10
                            backdrop-blur-xl
                            border border-white/10
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
            min-h-screen
            bg-gradient-to-br
            from-[#F4F7FB]
            to-[#EAF2FF]
            flex items-center
            justify-center
            px-4
        ">

            <div className="
                w-full
                max-w-md
                bg-white
                rounded-[32px]
                shadow-2xl
                border border-gray-100
                overflow-hidden
            ">

                {/* TOP */}
                <div className="
                    bg-gradient-to-r
                    from-[#021B33]
                    via-[#04284B]
                    to-[#063B6E]
                    px-8 py-10
                    text-center
                    text-white
                ">

                    <div className="
                        w-20 h-20
                        rounded-full
                        bg-white/10
                        border border-white/10
                        backdrop-blur-md
                        flex items-center
                        justify-center
                        mx-auto
                    ">

                        <UserRoundCheck size={40} />

                    </div>

                    <h1 className="
                        mt-6
                        text-3xl
                        font-extrabold
                    ">
                        Welcome Back
                    </h1>

                    <p className="
                        mt-2
                        text-blue-100
                    ">
                        Login to your school dashboard
                    </p>

                </div>

                {/* FORM */}
                <div className="p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* EMAIL */}
                        <div>

                            <label className="
                                text-sm
                                font-semibold
                                text-gray-700
                                block mb-2
                            ">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={form.email}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border border-gray-200
                                    bg-gray-50
                                    px-4 py-3
                                    rounded-2xl
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:bg-white
                                    transition
                                "
                                required
                            />

                        </div>

                        {/* PASSWORD */}
                        <div>

                            <label className="
                                text-sm
                                font-semibold
                                text-gray-700
                                block mb-2
                            ">
                                Password
                            </label>

                            <div className="relative">

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
                                    className="
                                        w-full
                                        border border-gray-200
                                        bg-gray-50
                                        px-4 py-3
                                        pr-12
                                        rounded-2xl
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                        focus:bg-white
                                        transition
                                    "
                                    required
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
                                        right-4 top-1/2
                                        -translate-y-1/2
                                        text-gray-500
                                    "
                                >

                                    {showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />}

                                </button>

                            </div>

                        </div>

                        {/* FORGOT */}
                        <div className="text-right">

                            <Link
                                href="/forgot-password"
                                className="
                                    text-sm
                                    text-blue-600
                                    hover:underline
                                "
                            >
                                Forgot Password?
                            </Link>

                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                py-4
                                rounded-2xl
                                bg-gradient-to-r
                                from-blue-600
                                to-cyan-500
                                hover:opacity-90
                                text-white
                                font-bold
                                shadow-lg
                                transition-all
                                duration-300
                            "
                        >

                            Login

                        </button>

                    </form>

                    {/* REGISTER */}
                    <p className="
                        text-center
                        text-gray-600
                        mt-6
                    ">

                        Don’t have an account?{" "}

                        <Link
                            href="/register"
                            className="
                                text-blue-600
                                font-semibold
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