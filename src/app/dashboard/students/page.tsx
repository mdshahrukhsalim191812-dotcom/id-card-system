"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

import {
    Users,
    Search,
    Trash2,
    GraduationCap,
    Hash,
    School,
    LayoutDashboard,
} from "lucide-react";

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
    const [search, setSearch] = useState("");

    // ================= FETCH =================
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
            toast.error("Failed to fetch students ❌");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // ================= DELETE ONE =================
    const handleDelete = async (id: string) => {

        toast((t) => (
            <div className="flex flex-col gap-4">

                <div>
                    <p className="font-bold text-gray-800 text-lg">
                        Delete Student?
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        This action cannot be undone.
                    </p>
                </div>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>

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

                                    setStudents((prev) =>
                                        prev.filter((s) => s._id !== id)
                                    );

                                    toast.success("Student deleted 🗑️");

                                } else {
                                    toast.error(data.message || "Delete failed ❌");
                                }

                            } catch (error) {
                                console.error(error);
                                toast.error("Something went wrong ❌");
                            }

                        }}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
                    >
                        Delete
                    </button>

                </div>

            </div>
        ));
    };

    // ================= DELETE ALL =================
    const handleDeleteAll = () => {

        if (filteredStudents.length === 0) {
            toast.error("No students found ❌");
            return;
        }

        toast((t) => (
            <div className="flex flex-col gap-4">

                <div>
                    <p className="font-bold text-gray-800 text-lg">
                        Delete All Students?
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        This will remove all filtered students permanently.
                    </p>
                </div>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>

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

                                    setStudents((prev) =>
                                        prev.filter((s) => !ids.includes(s._id))
                                    );

                                    toast.success(`${ids.length} students deleted 🗑️`);

                                } else {
                                    toast.error(data.message || "Delete failed ❌");
                                }

                            } catch (error) {
                                console.error(error);
                                toast.error("Something went wrong ❌");
                            }

                        }}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
                    >
                        Delete All
                    </button>

                </div>

            </div>
        ));
    };

    // ================= FILTER =================
    const filteredStudents = students.filter((s) => {

        const searchText = search.toLowerCase();

        return (
            s.name.toLowerCase().includes(searchText) ||
            s.class.toLowerCase().includes(searchText) ||
            s.roll.toLowerCase().includes(searchText)
        );
    });

    // ================= LOADER =================
    if (loading) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-[#021B33] via-[#04284B] to-[#063B6E] flex items-center justify-center overflow-hidden z-50">

                {/* Glow */}
                <div className="absolute w-[350px] h-[350px] bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">

                    {/* Logo Circle */}
                    <div className="relative">

                        <div className="absolute inset-0 rounded-full bg-blue-400 blur-2xl opacity-40 animate-pulse"></div>

                        <div className="relative w-28 h-28 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl">

                            <LayoutDashboard
                                size={50}
                                className="text-white animate-pulse"
                            />

                        </div>

                    </div>

                    {/* Loading Dots */}
                    <div className="mt-10 flex gap-3">

                        <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>

                        <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:0.2s]"></div>

                        <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:0.4s]"></div>

                    </div>

                    {/* Text */}
                    <h2 className="mt-8 text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
                        Loading Students
                    </h2>

                    <p className="mt-3 text-blue-100 text-center text-sm sm:text-base max-w-md leading-relaxed">
                        Please wait while we prepare your students list.
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F7FB]">

            {/* ================= HEADER ================= */}
            <div className="bg-gradient-to-r from-[#021B33] to-[#063B6E] text-white">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        {/* LEFT */}
                        <div>

                            <h1 className="text-3xl sm:text-4xl font-extrabold">
                                All Students
                            </h1>

                            <p className="text-blue-100 mt-2 text-sm sm:text-base">
                                Manage, search and delete students professionally.
                            </p>

                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

                            {/* SEARCH */}
                            <div className="relative w-full sm:w-[320px]">

                                <Search
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />

                                <input
                                    type="text"
                                    placeholder="Search students..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl border-none outline-none text-gray-800 shadow-lg"
                                />

                            </div>

                            {/* DELETE ALL */}
                            <button
                                onClick={handleDeleteAll}
                                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-2xl font-semibold shadow-lg"
                            >
                                <Trash2 size={18} />

                                Delete All
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= CONTENT ================= */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* ================= STATS ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">

                    {/* TOTAL */}
                    <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 font-medium">
                                    Total Students
                                </p>

                                <h2 className="text-4xl font-extrabold text-blue-600 mt-2">
                                    {students.length}
                                </h2>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                                <Users size={32} />
                            </div>

                        </div>

                    </div>

                    {/* FILTERED */}
                    <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 font-medium">
                                    Filtered Results
                                </p>

                                <h2 className="text-4xl font-extrabold text-green-600 mt-2">
                                    {filteredStudents.length}
                                </h2>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                                <GraduationCap size={32} />
                            </div>

                        </div>

                    </div>

                    {/* SEARCH */}
                    <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 font-medium">
                                    Search Active
                                </p>

                                <h2 className="text-2xl font-bold text-orange-500 mt-2 break-all">
                                    {search || "No Search"}
                                </h2>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500">
                                <Search size={30} />
                            </div>

                        </div>

                    </div>

                </div>

                {/* ================= DESKTOP TABLE ================= */}
                <div className="hidden lg:block bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-[#F8FAFC]">

                                <tr className="text-gray-600 text-left">

                                    <th className="px-6 py-5 font-semibold">
                                        Student Name
                                    </th>

                                    <th className="px-6 py-5 font-semibold">
                                        Class
                                    </th>

                                    <th className="px-6 py-5 font-semibold">
                                        Roll Number
                                    </th>

                                    <th className="px-6 py-5 text-center font-semibold">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredStudents.map((s) => (

                                    <tr
                                        key={s._id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >

                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-4">

                                                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                                    {s.name.charAt(0)}
                                                </div>

                                                <div>

                                                    <p className="font-semibold text-gray-800">
                                                        {s.name}
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        Student Record
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-6 py-5 font-medium">
                                            {s.class}
                                        </td>

                                        <td className="px-6 py-5 font-medium">
                                            {s.roll}
                                        </td>

                                        <td className="px-6 py-5 text-center">

                                            <button
                                                onClick={() => handleDelete(s._id)}
                                                className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl font-semibold transition"
                                            >
                                                <Trash2 size={16} />

                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* ================= MOBILE + TABLET ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">

                    {filteredStudents.map((s) => (

                        <div
                            key={s._id}
                            className="bg-white rounded-3xl p-5 shadow-md border border-gray-100"
                        >

                            {/* TOP */}
                            <div className="flex items-start justify-between gap-4">

                                <div className="flex items-center gap-4">

                                    <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">
                                        {s.name.charAt(0)}
                                    </div>

                                    <div>

                                        <h2 className="font-bold text-lg text-gray-800">
                                            {s.name}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Student Record
                                        </p>

                                    </div>

                                </div>

                                <School className="text-gray-300" size={24} />

                            </div>

                            {/* DETAILS */}
                            <div className="mt-6 space-y-4">

                                <div className="flex items-center gap-3 text-gray-700">

                                    <GraduationCap size={18} className="text-blue-500" />

                                    <span className="font-medium">
                                        Class:
                                    </span>

                                    <span>{s.class}</span>

                                </div>

                                <div className="flex items-center gap-3 text-gray-700">

                                    <Hash size={18} className="text-green-500" />

                                    <span className="font-medium">
                                        Roll:
                                    </span>

                                    <span>{s.roll}</span>

                                </div>

                            </div>

                            {/* BUTTON */}
                            <button
                                onClick={() => handleDelete(s._id)}
                                className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-semibold transition flex items-center justify-center gap-2"
                            >
                                <Trash2 size={18} />

                                Delete Student
                            </button>

                        </div>

                    ))}

                </div>

                {/* EMPTY */}
                {filteredStudents.length === 0 && (

                    <div className="bg-white rounded-3xl shadow-md p-10 text-center mt-6">

                        <Users
                            size={60}
                            className="mx-auto text-gray-300"
                        />

                        <h2 className="text-2xl font-bold text-gray-700 mt-4">
                            No Students Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try changing your search keyword.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}