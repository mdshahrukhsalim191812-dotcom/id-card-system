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

    
}