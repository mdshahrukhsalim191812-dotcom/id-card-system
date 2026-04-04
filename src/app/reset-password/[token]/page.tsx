"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// 🔥 Strength + rules checker
function checkPassword(password: string) {
    return {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };
}

function getStrengthScore(rules: any) {
    return Object.values(rules).filter(Boolean).length;
}

export default function ResetPasswordPage() {
    const { token } = useParams();
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const rules = checkPassword(password);
    const score = getStrengthScore(rules);

    const strengthLabel =
        score <= 1
            ? "Weak"
            : score === 2 || score === 3
                ? "Medium"
                : "Strong";

    const strengthColor =
        score <= 1
            ? "bg-red-500"
            : score === 2 || score === 3
                ? "bg-yellow-500"
                : "bg-green-600";

    const strengthText =
        score <= 1
            ? "text-red-500"
            : score === 2 || score === 3
                ? "text-yellow-600"
                : "text-green-600";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Password updated successfully ✅");
                router.push("/login");
            } else {
                toast.error(data.message || "Error ❌");
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

                <h2 className="text-2xl font-bold text-center text-blue-600">
                    Reset Password
                </h2>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                    {/* 🔐 PASSWORD */}
                    <div className="relative">
                        <input
                            type={showPassword1 ? "text" : "password"}
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-3 rounded-lg pr-10"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword1(!showPassword1)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* 🔥 STRENGTH BAR */}
                    {password && (
                        <>
                            <div className="w-full h-2 bg-gray-200 rounded">
                                <div
                                    className={`h-2 rounded transition-all ${strengthColor}`}
                                    style={{ width: `${(score / 4) * 100}%` }}
                                ></div>
                            </div>

                            <p className={`text-sm font-semibold ${strengthText}`}>
                                Strength: {strengthLabel}
                            </p>
                        </>
                    )}

                    {/* 📋 RULES CHECKLIST */}
                    {password && (
                        <div className="text-sm space-y-1">
                            <p className={rules.length ? "text-green-600" : "text-red-500"}>
                                {rules.length ? "✔" : "✖"} At least 8 characters
                            </p>
                            <p className={rules.uppercase ? "text-green-600" : "text-red-500"}>
                                {rules.uppercase ? "✔" : "✖"} One uppercase letter
                            </p>
                            <p className={rules.number ? "text-green-600" : "text-red-500"}>
                                {rules.number ? "✔" : "✖"} One number
                            </p>
                            <p className={rules.special ? "text-green-600" : "text-red-500"}>
                                {rules.special ? "✔" : "✖"} One special character
                            </p>
                        </div>
                    )}

                    {/* 🔐 CONFIRM PASSWORD */}
                    <div className="relative">
                        <input
                            type={showPassword2 ? "text" : "password"}
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border p-3 rounded-lg pr-10"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword2(!showPassword2)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showPassword2 ? <FaEyeSlash /> : <FaEye />}
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

                    {/* 🔘 BUTTON */}
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