"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";


export default function LoginPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();

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
                // 👉 Save schoolId
                localStorage.setItem("schoolId", data.school._id);

                toast.success("Login Successfully.")
                router.push("/dashboard");
                setLoading(false);
                return;

            } else {
                toast.error(data.message || "Login failed ❌");
                setLoading(false);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-blue-600">
                    Welcome Back
                </h2>

                <p className="text-center text-gray-500 mt-2">
                    Login to your account
                </p>

                {/* Form */}
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

                        {/* Toggle Button */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <Link href="#" className="text-sm text-blue-600">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Button */}
                    <button
                        disabled={loading}
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        {loading ? "Wait..." : "Login"}
                    </button>

                </form>

                {/* Register Link */}
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