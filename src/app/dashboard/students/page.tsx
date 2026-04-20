"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

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

    // 🔥 FETCH
    const fetchStudents = async () => {
        try {
            setLoading(true);

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

    // 🔍 FILTER
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

    // 🔥 FULL PAGE LOADER
    if (loading) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex flex-col items-center justify-center text-white z-50">

                {/* LOGO */}
                <Image
                    src="/genix-logo.png"
                    alt="logo"
                    width={90}
                    height={90}
                    className="mb-4"
                />

                {/* SPINNER */}
                <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

                {/* TEXT */}
                <p className="mt-4 text-[20px] opacity-80">
                    Loading students...
                </p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

            <h1 className="text-xl md:text-3xl font-bold mb-6 text-gray-800 text-center md:text-left">
                All Students
            </h1>

            {/* STATS + SEARCH */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                <div className="bg-white p-2 rounded-xl shadow text-center">
                    <p className="text-gray-500 text-sm font-semibold">
                        Total Students
                    </p>
                    <h2 className="text-2xl font-bold text-blue-600">
                        {students.length}
                    </h2>
                </div>

                <input
                    type="text"
                    placeholder="Search students..."
                    className="border p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button
                    onClick={handleDeleteAll}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow w-full"
                >
                    Delete All
                </button>
            </div>

            {/* TABLE */}
            <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
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
                            <tr key={s._id} className="border-t hover:bg-gray-50">
                                <td className="p-3 font-medium">{s.name}</td>
                                <td className="p-3">{s.class}</td>
                                <td className="p-3">{s.roll}</td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => handleDelete(s._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE */}
            <div className="md:hidden space-y-4 mt-4">
                {filteredStudents.map((s) => (
                    <div key={s._id} className="bg-white p-4 rounded-xl shadow">
                        <p className="font-semibold">{s.name}</p>
                        <p className="text-sm text-gray-500">Class: {s.class}</p>
                        <p className="text-sm text-gray-500">Roll: {s.roll}</p>

                        <button
                            onClick={() => handleDelete(s._id)}
                            className="mt-3 w-full bg-red-500 text-white py-2 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}