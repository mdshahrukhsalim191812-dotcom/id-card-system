"use client";

import { useState } from "react";

export default function AddStudentPage() {
    const [form, setForm] = useState({
        name: "",
        class: "",
        roll: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
        alert("Student Added ✅");
    };

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">Add Student</h1>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full border p-3 rounded"
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <input
                    type="text"
                    placeholder="Class"
                    className="w-full border p-3 rounded"
                    onChange={(e) =>
                        setForm({ ...form, class: e.target.value })
                    }
                />

                <input
                    type="text"
                    placeholder="Roll No"
                    className="w-full border p-3 rounded"
                    onChange={(e) =>
                        setForm({ ...form, roll: e.target.value })
                    }
                />

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Save Student
                </button>

            </form>

        </div>
    );
}