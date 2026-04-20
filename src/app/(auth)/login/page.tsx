"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";

export default function LoginPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("schoolId", data.school._id);
                localStorage.setItem("school", JSON.stringify(data.school));

                toast.success("Login Successfully ✅");

                // 🔥 Small delay for smooth UX
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 800);

            } else {
                toast.error(data.message || "Login failed ❌");
                setLoading(false);
            }

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong ❌");
            setLoading(false);
        }
    };

    // 🔥 FULL SCREEN LOADER
    if (loading) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex flex-col items-center justify-center text-white z-50">

                {/* LOGO */}
                <Image
                    src="/genix-logo.png"
                    alt="logo"
                    width={100}
                    height={100}
                    className="mb-4"
                />

                {/* SPINNER */}
                <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

                {/* TEXT */}
                <p className="mt-4 text-[20px] opacity-80">
                    Logging you in...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

                <h2 className="text-2xl font-bold text-center text-blue-600">
                    Welcome Back
                </h2>

                <p className="text-center text-gray-500 mt-2">
                    Login to your account
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Forgot */}
                    <div className="text-right">
                        <Link href="/forgot-password" className="text-sm text-blue-600">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <Link href="/register" className="text-blue-600 font-medium">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}