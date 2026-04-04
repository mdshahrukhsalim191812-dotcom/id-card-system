"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1); // 1 = email, 2 = otp
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // 🔹 SEND OTP
    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loading) return;

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
                toast.success("OTP sent to your email 📩");
                setStep(2); // 👉 show OTP input
            } else {
                toast.error(data.message || "Something went wrong ❌");
            }
        } catch {
            toast.error("Server error ❌");
        }

        setLoading(false);
    };

    // 🔹 VERIFY OTP
    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!otp) {
            toast.error("Enter OTP ❌");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("OTP verified ✅");

                // 👉 redirect to reset page with email
                router.push(`/reset-password?email=${email}`);
            } else {
                toast.error(data.message || "Invalid OTP ❌");
            }
        } catch {
            toast.error("Server error ❌");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

                <h2 className="text-2xl font-bold text-center text-blue-600">
                    Forgot Password
                </h2>

                <p className="text-center text-gray-500 mt-2">
                    {step === 1
                        ? "Enter your email to get OTP"
                        : "Enter OTP sent to your email"}
                </p>

                {/* STEP 1 - EMAIL */}
                {step === 1 && (
                    <form onSubmit={handleSendOTP} className="mt-6 space-y-4">

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
                            {loading ? "Sending..." : "Send OTP"}
                        </button>

                    </form>
                )}

                {/* STEP 2 - OTP */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOTP} className="mt-6 space-y-4">

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full border p-3 rounded-lg text-center tracking-widest"
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full p-2 rounded text-white transition 
              ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-500 hover:bg-green-600"}`}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>

                        {/* 🔁 RESEND */}
                        <button
                            type="button"
                            onClick={handleSendOTP}
                            className="text-blue-600 text-sm w-full"
                        >
                            Resend OTP
                        </button>

                    </form>
                )}

            </div>
        </div>
    );
}