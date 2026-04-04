"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// 🔥 Password rules
function checkPassword(password: string) {
    return {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };
}

function getScore(rules: any) {
    return Object.values(rules).filter(Boolean).length;
}

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const email = searchParams.get("email");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const [loading, setLoading] = useState(false);

    const rules = checkPassword(password);
    const score = getScore(rules);

    // 🔥 Strength
    const strength =
        score <= 2 ? "Weak" : score <= 4 ? "Medium" : "Strong";

    const color =
        score <= 2
            ? "bg-red-500"
            : score <= 4
                ? "bg-yellow-500"
                : "bg-green-600";

    const textColor =
        score <= 2
            ? "text-red-500"
            : score <= 4
                ? "text-yellow-600"
                : "text-green-600";

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!email) {
            toast.error("Invalid request ❌");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match ❌");
            return;
        }

        if (score < 4) {
            toast.error("Password is too weak ❌");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Password updated ✅");
                router.push("/login");
            } else {
                toast.error(data.message || "Error ❌");
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
                    Reset Password
                </h2>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                    {/* 🔐 PASSWORD */}
                    <div className="relative">
                        <input
                            type={show1 ? "text" : "password"}
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-3 rounded-lg pr-10"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShow1(!show1)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {show1 ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* 🔥 STRENGTH BAR */}
                    {password && (
                        <>
                            <div className="w-full h-2 bg-gray-200 rounded">
                                <div
                                    className={`h-2 rounded ${color}`}
                                    style={{ width: `${(score / 5) * 100}%` }}
                                />
                            </div>

                            <p className={`text-sm font-semibold ${textColor}`}>
                                Strength: {strength}
                            </p>
                        </>
                    )}

                    {/* 📋 RULES */}
                    {password && (
                        <div className="text-sm space-y-1">
                            <p className={rules.length ? "text-green-600" : "text-red-500"}>
                                {rules.length ? "✔" : "✖"} At least 8 characters 
                            </p>
                            <p className={rules.uppercase ? "text-green-600" : "text-red-500"}>
                                {rules.uppercase ? "✔" : "✖"} Uppercase letter (A-Z)
                            </p>
                            <p className={rules.lowercase ? "text-green-600" : "text-red-500"}>
                                {rules.lowercase ? "✔" : "✖"} Lowercase letter (a-z)
                            </p>
                            <p className={rules.number ? "text-green-600" : "text-red-500"}>
                                {rules.number ? "✔" : "✖"} Number (0-9)
                            </p>
                            <p className={rules.special ? "text-green-600" : "text-red-500"}>
                                {rules.special ? "✔" : "✖"} Special character (e.g., !@#$%^&*()-+)
                            </p>
                        </div>
                    )}

                    {/* 🔐 CONFIRM PASSWORD */}
                    <div className="relative">
                        <input
                            type={show2 ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border p-3 rounded-lg pr-10"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShow2(!show2)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {show2 ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* ✅ MATCH STATUS */}
                    {confirmPassword && (
                        <p
                            className={`text-sm font-semibold ${password === confirmPassword
                                    ? "text-green-600"
                                    : "text-red-500"
                                }`}
                        >
                            {password === confirmPassword
                                ? "Passwords match ✔"
                                : "Passwords do not match ❌"}
                        </p>
                    )}

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>

                </form>

            </div>
        </div>
    );
}