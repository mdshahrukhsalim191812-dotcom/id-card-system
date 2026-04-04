"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loading) return;

        // ✅ Basic validation
        if (!email.includes("@")) {
            toast.error("Enter valid email ❌");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Reset link sent (check console) ✅");
                setEmail(""); // clear input
            } else {
                toast.error(data.message || "Something went wrong ❌");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-blue-600">
                    Forgot Password
                </h2>

                <p className="text-center text-gray-500 mt-2">
                    Enter your email to reset password
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-2 rounded text-white transition 
              ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"}`}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>

                </form>
            </div>
        </div>
    );
}