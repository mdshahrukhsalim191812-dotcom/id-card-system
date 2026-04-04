"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VerifyOTPPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp, password }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Password reset successful ✅");
                router.push("/login");
            } else {
                toast.error(data.message);
            }

        } catch {
            toast.error("Error ❌");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow w-80 space-y-4"
            >
                <h2 className="text-xl font-bold text-center">Verify OTP</h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full border p-2 rounded"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full border p-2 rounded"
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="New Password"
                    className="w-full border p-2 rounded"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    className="w-full bg-blue-500 text-white p-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify & Reset"}
                </button>
            </form>
        </div>
    );
}