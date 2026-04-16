"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Student = {
    _id: string;
    name: string;
    class: string;
    roll: string;
    schoolId?: {
        _id: string;
        email: string;
    };
};

export default function SchoolAdmin() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSchool, setSelectedSchool] = useState("");
    const [search, setSearch] = useState("");

    const fetchStudents = async () => {
        try {
            const res = await fetch("/api/students", {
                credentials: "include",
            });

            const data = await res.json();
            setStudents(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to get students ❌");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // 🔴 DELETE ONE
    const handleDelete = async (id: string) => {
        toast((t) => (
            <div className="flex flex-col gap-3">
                <p className="font-semibold text-black">
                    ⚠️ Delete this student?
                </p>

                <div className="flex gap-2 justify-end">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);

                            try {
                                const res = await fetch(`/api/students?id=${id}`, {
                                    method: "DELETE",
                                    credentials: "include",
                                });

                                const data = await res.json();

                                if (data.success) {
                                    toast.success("Deleted successfully 🗑️");

                                    setStudents((prev) =>
                                        prev.filter((s) => s._id !== id)
                                    );
                                } else {
                                    toast.error(data.message || "Delete failed ❌");
                                }
                            } catch (error) {
                                console.error(error);
                                toast.error("Error deleting ❌");
                            }
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                        Yes
                    </button>

                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ));
    };

    // 🔥 DELETE ALL
    const handleDeleteAll = () => {
        if (filteredStudents.length === 0) {
            toast.error("No students to delete ❌");
            return;
        }

        toast((t) => (
            <div className="flex flex-col gap-3">
                <p className="font-semibold text-black">
                    ⚠️ Delete ALL filtered students?
                </p>

                <div className="flex gap-2 justify-end">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);

                            try {
                                const ids = filteredStudents.map((s) => s._id);

                                const res = await fetch("/api/students", {
                                    method: "PATCH",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    credentials: "include",
                                    body: JSON.stringify({ ids }),
                                });

                                const data = await res.json();

                                if (data.success) {
                                    toast.success(`Deleted ${ids.length} students 🗑️`);

                                    setStudents((prev) =>
                                        prev.filter((s) => !ids.includes(s._id))
                                    );
                                } else {
                                    toast.error(data.message || "Delete failed ❌");
                                }
                            } catch (error) {
                                console.error(error);
                                toast.error("Error deleting ❌");
                            }
                        }}
                        className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded"
                    >
                        Yes, Delete All
                    </button>

                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ));
    };

    // FILTER
    const filteredStudents = students.filter((s) => {
        const matchesSchool = selectedSchool
            ? s.schoolId?._id === selectedSchool
            : true;

        const matchesSearch =
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.class.toLowerCase().includes(search.toLowerCase()) ||
            s.roll.toLowerCase().includes(search.toLowerCase());

        return matchesSchool && matchesSearch;
    });

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                All students of school
            </h1>

            {/* STATS + SEARCH + DELETE ALL */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 items-center">

                <div className="bg-white p-[1-px] rounded-md shadow">
                    <p className="text-gray-500 text-sm font-bold flex justify-center">
                        Total Students
                    </p>
                    <h2 className="text-2xl font-bold text-blue-600 flex justify-center">
                        {students.length}
                    </h2>
                </div>

                <input
                    type="text"
                    placeholder="Search students..."
                    className="border p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* 🔥 DELETE ALL BUTTON */}
                <button
                    onClick={handleDeleteAll}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
                >
                    Delete All
                </button>

            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow overflow-hidden">

                {loading ? (
                    <p className="p-4">Loading...</p>
                ) : (
                    <table className="w-full text-left">

                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Class</th>
                                <th className="p-3">Roll</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredStudents.map((s) => (
                                <tr
                                    key={s._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="p-3 font-medium">{s.name}</td>
                                    <td className="p-3">{s.class}</td>
                                    <td className="p-3">{s.roll}</td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleDelete(s._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}
            </div>
        </div>
    );
}