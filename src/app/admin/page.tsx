"use client";

import { useEffect, useState } from "react";

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

export default function AdminPage() {
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Delete this student?");

        if (!confirmDelete) return;

        const res = await fetch(`/api/students?id=${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
            setStudents((prev) => prev.filter((s) => s._id !== id));
        }
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

    const uniqueSchools = [
        ...new Map(
            students.map((s) => [s.schoolId?._id, s.schoolId])
        ).values(),
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                👑 Admin Dashboard
            </h1>

            {/* STATS CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-gray-500 text-sm">Total Students</p>
                    <h2 className="text-2xl font-bold text-blue-600">
                        {students.length}
                    </h2>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-gray-500 text-sm">Total Schools</p>
                    <h2 className="text-2xl font-bold text-green-600">
                        {
                            new Set(
                                students.map((s) => s.schoolId?._id)
                            ).size
                        }
                    </h2>
                </div>
            </div>

            {/* SEARCH + FILTER */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">

                <input
                    type="text"
                    placeholder="🔍 Search students..."
                    className="border p-3 rounded w-full shadow-sm focus:ring-2 focus:ring-blue-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="border p-3 rounded shadow-sm"
                    onChange={(e) => setSelectedSchool(e.target.value)}
                >
                    <option value="">All Schools</option>

                    {uniqueSchools.map((school: any) => (
                        <option key={school?._id} value={school?._id}>
                            {school?.email}
                        </option>
                    ))}
                </select>

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
                                <th className="p-3">School</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredStudents.map((s, i) => (
                                <tr
                                    key={i}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="p-3 font-medium">{s.name}</td>
                                    <td className="p-3">{s.class}</td>
                                    <td className="p-3">{s.roll}</td>
                                    <td className="p-3 text-gray-600">
                                        {s.schoolId?.email || "N/A"}
                                    </td>

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