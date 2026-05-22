"use client";

import { useState } from "react";
import toast from "react-hot-toast";

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

        <div className="
            min-h-screen
            flex items-center
            justify-center
            bg-gray-100
        ">

            <div className="
                bg-white
                p-8
                rounded-2xl
                shadow-xl
                w-full
                max-w-md
            ">

                <h1 className="
                    text-3xl
                    font-bold
                    text-center
                    text-blue-600
                ">
                    Admin Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-4"
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Admin Email"
                        value={form.email}
                        onChange={handleChange}
                        className="
                            w-full
                            border
                            p-3
                            rounded-lg
                        "
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="
                            w-full
                            border
                            p-3
                            rounded-lg
                        "
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            py-3
                            rounded-lg
                            font-bold
                        "
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"}

                    </button>

                </form>

            </div>

        </div>
    );
}