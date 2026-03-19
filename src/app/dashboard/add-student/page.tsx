"use client";

import { useState } from "react";

export default function AddStudentPage() {
    const [form, setForm] = useState({
        name: "",
        class: "",
        roll: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Student added successfully ✅");
                setForm({ name: "", class: "", roll: "" });
            } else {
                setMessage("Error adding student ❌");
            }
        } catch (error) {
            setMessage("Server error ❌");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
            <h1 className="text-xl font-bold mb-4">Add Student</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Student Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="class"
                    placeholder="Class"
                    value={form.class}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="roll"
                    placeholder="Roll Number"
                    value={form.roll}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Student"}
                </button>
            </form>

            {message && (
                <p className="mt-4 text-center text-sm">{message}</p>
            )}
        </div>
    );
}