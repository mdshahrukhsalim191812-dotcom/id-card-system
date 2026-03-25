"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  //const [message, setMessage] = useState("")
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

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 charecters")
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success("Account Created Successfully.")
        setTimeout(() => {
          router.push("/login");
        }, 1000)
      }

      else {
        if (res.status === 400) {
          toast.error("User already exists, Please login!")
          router.push("/login")
        }
        else {
          toast.error(data.message || "Registration Failed!")
        }
      }
    }
    catch (error) {
      toast.error("Something went wrong!")
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

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

          <button
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {/* Login Link */}
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