"use client";

import { useState } from "react";

export default function StudentForm() {
    const [form, setForm] = useState({
        name: "",
        class: "",
        roll: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await fetch("/api/students", {
            method: "POST",
            body: JSON.stringify(form),
        });

        alert("Student Saved");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded shadow">
            <input
                className="border p-2 w-full"
                placeholder="Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
                className="border p-2 w-full"
                placeholder="Class"
                onChange={(e) => setForm({ ...form, class: e.target.value })}
            />

            <input
                className="border p-2 w-full"
                placeholder="Roll No"
                onChange={(e) => setForm({ ...form, roll: e.target.value })}
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Save Student
            </button>
        </form>
    );
}