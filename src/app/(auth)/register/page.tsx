"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// 🔥 Password rules checker
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

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [loading, setLoading] = useState(false);

  const rules = checkPassword(form.password);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    if (score < 4) {
      toast.error("Password is too weak ❌");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account Created Successfully ✅");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        if (res.status === 400) {
          toast.error("User already exists, Please login!");
          router.push("/login");
        } else {
          toast.error(data.message || "Registration Failed!");
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Register your school account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="School Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

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

          {/* 🔐 PASSWORD */}
          <div className="relative">
            <input
              type={showPassword1 ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {form.password && (
            <>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div
                  className={`h-2 rounded ${strengthColor}`}
                  style={{ width: `${(score / 4) * 100}%` }}
                ></div>
              </div>

              <p className={`text-sm font-semibold ${strengthText}`}>
                Strength: {strengthLabel}
              </p>
            </>
          )}

          {/* 📋 RULES */}
          {form.password && (
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
              placeholder="Confirm Password"
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

          {/* ✅ MATCH */}
          {confirmPassword && (
            <p
              className={`text-sm font-semibold ${form.password === confirmPassword
                  ? "text-green-600"
                  : "text-red-500"
                }`}
            >
              {form.password === confirmPassword
                ? "Passwords match ✔"
                : "Passwords do not match ❌"}
            </p>
          )}

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {/* Login */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}