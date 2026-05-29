"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function AdminLoginPage() {

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (loading) return;

        try {

            setLoading(true);

            const res = await fetch(
                "/api/admin/login",
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

            if (!res.ok) {

                toast.error(
                    data.message || "Login Failed"
                );

                setLoading(false);

                return;
            }

            toast.success(
                "Admin Login Successful"
            );

            localStorage.setItem(
                "admin",
                JSON.stringify(data.admin)
            );

            window.location.href = "/admin";

        } catch (error) {

            console.log(error);

            toast.error("Something went wrong");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div
            className="
            relative

            min-h-screen

            flex items-center
            justify-center

            overflow-hidden

            bg-gradient-to-br
            from-[#031326]
            via-[#062B52]
            to-[#021B33]

            px-4
            py-10
        "
        >

            {/* ================= BACKGROUND GLOW ================= */}
            <div
                className="
                absolute
                -top-32
                -left-32

                w-[420px]
                h-[420px]

                bg-cyan-400/10

                blur-[120px]

                rounded-full
            "
            ></div>

            <div
                className="
                absolute
                -bottom-32
                -right-32

                w-[420px]
                h-[420px]

                bg-blue-500/10

                blur-[120px]

                rounded-full
            "
            ></div>

            {/* ================= GRID ================= */}
            <div
                className="
                absolute inset-0

                opacity-[0.03]

                [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]

                [background-size:60px_60px]
            "
            ></div>

            {/* ================= LOGIN CARD ================= */}
            <div
                className="
                relative z-10

                w-full
                max-w-[520px]

                overflow-hidden

                rounded-[34px]

                border border-white/10

                bg-white/[0.08]
                backdrop-blur-3xl

                shadow-[0_20px_80px_rgba(0,0,0,0.45)]

                p-6
                sm:p-10
            "
            >

                {/* CARD GLOW */}
                <div
                    className="
                    absolute
                    top-0
                    left-1/2
                    -translate-x-1/2

                    w-[350px]
                    h-[180px]

                    bg-cyan-400/10

                    blur-[100px]

                    rounded-full
                "
                ></div>

                {/* ================= LOGO ================= */}
                <div className="relative z-10 flex flex-col items-center">

                    <div className="flex items-center gap-4">

                        {/* LOGO */}
                        <div
                            className="
                            relative

                            w-20 h-20

                            rounded-3xl

                            bg-white/[0.08]

                            border border-white/10

                            flex items-center justify-center

                            shadow-xl
                        "
                        >

                            <Image
                                src="/genix-logo.png"
                                alt="Work GeniX"
                                width={62}
                                height={62}
                                className="object-contain"
                                priority
                            />

                        </div>

                        {/* BRAND */}
                        <div>

                            <h1
                                className="
                                text-3xl
                                sm:text-4xl

                                font-black

                                tracking-tight

                                text-white
                            "
                            >

                                Work{" "}

                                <span
                                    className="
                                    bg-gradient-to-r
                                    from-cyan-300
                                    via-blue-300
                                    to-cyan-400

                                    bg-clip-text
                                    text-transparent
                                "
                                >
                                    GeniX
                                </span>

                            </h1>

                            <p
                                className="
                                mt-1

                                text-sm

                                text-gray-300
                            "
                            >
                                Printing | Designing | Branding
                            </p>

                        </div>

                    </div>

                    {/* TITLE */}
                    <div className="mt-10 text-center">

                        <h2
                            className="
                            text-4xl
                            sm:text-5xl

                            font-extrabold

                            text-white
                        "
                        >
                            Welcome Admin!
                        </h2>

                        <p
                            className="
                            mt-3

                            text-base

                            text-gray-300
                        "
                        >
                            Login to Admin dashboard
                        </p>

                    </div>

                </div>

                {/* ================= FORM ================= */}
                <form
                    onSubmit={handleSubmit}
                    className="
                    relative z-10

                    mt-10

                    space-y-6
                "
                >

                    {/* EMAIL */}
                    <div>

                        <label
                            className="
                            block

                            mb-3

                            text-sm
                            font-semibold

                            text-white
                        "
                        >
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

                            h-[62px]

                            rounded-2xl

                            border border-white/15

                            bg-white/[0.08]
                            backdrop-blur-xl

                            px-5

                            text-white
                            placeholder:text-gray-300

                            outline-none

                            focus:border-cyan-400
                            focus:ring-4
                            focus:ring-cyan-400/20

                            transition-all duration-300
                        "
                        />

                    </div>

                    {/* PASSWORD */}
                    <div>

                        <div
                            className="
                            flex items-center
                            justify-between

                            mb-3
                        "
                        >

                            <label
                                className="
                                text-sm
                                font-semibold

                                text-white
                            "
                            >
                                Password
                            </label>

                        </div>

                        <div className="relative">

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="
                                w-full

                                h-[62px]

                                rounded-2xl

                                border border-white/15

                                bg-white/[0.08]
                                backdrop-blur-xl

                                px-5
                                pr-14

                                text-white
                                placeholder:text-gray-300

                                outline-none

                                focus:border-cyan-400
                                focus:ring-4
                                focus:ring-cyan-400/20

                                transition-all duration-300
                            "
                            />

                        </div>

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                        group

                        relative

                        w-full

                        h-[64px]

                        overflow-hidden

                        rounded-2xl

                        bg-gradient-to-r
                        from-cyan-400
                        via-blue-500
                        to-cyan-400

                        text-white

                        text-lg
                        font-bold

                        shadow-[0_10px_50px_rgba(34,211,238,0.35)]

                        hover:scale-[1.02]
                        active:scale-[0.98]

                        transition-all duration-300
                    "
                    >

                        {/* SHINE */}
                        <span
                            className="
                            absolute
                            inset-0

                            -translate-x-full

                            bg-gradient-to-r
                            from-transparent
                            via-white/20
                            to-transparent

                            group-hover:translate-x-full

                            transition-all duration-1000
                        "
                        ></span>

                        <span className="relative z-10">

                            {loading
                                ? "Logging in..."
                                : "Login"}

                        </span>

                    </button>

                </form>

            </div>

        </div>

    );
}