"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
    School,
    Search,
    Trash2,
} from "lucide-react";

type SchoolType = {
    _id: string;
    name: string;
    email: string;
    templateId?: string;
};

export default function AdminSchoolsPage() {

    const [schools, setSchools] = useState<SchoolType[]>([]);
    const [filteredSchools, setFilteredSchools] = useState<SchoolType[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // ================= FETCH =================
    useEffect(() => {

        const fetchSchools = async () => {

            try {

                const res = await fetch("/api/admin/schools");

                const data = await res.json();

                setSchools(data);
                setFilteredSchools(data);

            } catch (error) {

                console.log(error);

                toast.error("Failed to load schools");

            } finally {

                setLoading(false);
            }
        };

        fetchSchools();

    }, []);

    // ================= SEARCH =================
    useEffect(() => {

        const filtered = schools.filter((school) =>
            school.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            school.email
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        setFilteredSchools(filtered);

    }, [search, schools]);

    // ================= DELETE =================
    const handleDelete = async (
        id: string,
        schoolName: string
    ) => {

        toast((t) => (

            <div className="flex flex-col gap-4">

                <div>

                    <h2 className="font-bold text-gray-800 text-lg">
                        Delete School?
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {schoolName} and all students will be permanently deleted.
                    </p>

                </div>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="
                            px-4 py-2 rounded-xl
                            bg-gray-100 hover:bg-gray-200
                            text-gray-700 font-medium
                            transition
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={async () => {

                            toast.dismiss(t.id);

                            const loadingToast = toast.loading(
                                "Deleting school..."
                            );

                            try {

                                const res = await fetch(
                                    `/api/admin/schools/${id}`,
                                    {
                                        method: "DELETE",
                                    }
                                );

                                const data = await res.json();

                                toast.dismiss(loadingToast);

                                if (data.success) {

                                    setSchools((prev) =>
                                        prev.filter(
                                            (school) =>
                                                school._id !== id
                                        )
                                    );

                                    toast.success(
                                        "School deleted successfully"
                                    );

                                } else {

                                    toast.error(
                                        data.message ||
                                        "Delete failed"
                                    );
                                }

                            } catch (error) {

                                console.log(error);

                                toast.dismiss(loadingToast);

                                toast.error(
                                    "Something went wrong"
                                );
                            }

                        }}
                        className="
                            px-4 py-2 rounded-xl
                            bg-red-500 hover:bg-red-600
                            text-white font-semibold
                            transition
                        "
                    >
                        Delete
                    </button>

                </div>

            </div>

        ));
    };

    // ================= LOADING =================
    if (loading) {

        return (
            <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center">

                <div className="flex flex-col items-center">

                    <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                    <p className="mt-4 text-gray-600 font-medium">
                        Loading schools...
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F7FB] p-4 sm:p-6">

            {/* ================= HEADER ================= */}
            <div className="mb-8">

                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                    Schools Management
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage all registered schools from one panel.
                </p>

            </div>

            {/* ================= TOP SECTION ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

                {/* CARD */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Total Schools
                            </p>

                            <h2 className="text-4xl font-extrabold mt-2 text-blue-600">
                                {schools.length}
                            </h2>

                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                            <School size={28} />
                        </div>

                    </div>

                </div>

                {/* SEARCH */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-4 shadow-sm border flex items-center">

                    <div className="relative w-full">

                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search schools..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="
                                w-full pl-11 pr-4 py-3
                                rounded-2xl border border-gray-200
                                focus:ring-2 focus:ring-blue-500
                                outline-none
                            "
                        />

                    </div>

                </div>

            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden lg:block bg-white rounded-3xl shadow-sm border overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr className="text-left">

                            <th className="p-5 font-bold text-gray-700">
                                School Name
                            </th>

                            <th className="p-5 font-bold text-gray-700">
                                Email
                            </th>

                            <th className="p-5 font-bold text-gray-700">
                                Template
                            </th>

                            <th className="p-5 font-bold text-gray-700 text-center">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredSchools.map((school) => (

                            <tr
                                key={school._id}
                                className="border-t hover:bg-gray-50 transition"
                            >

                                <td className="p-5 font-semibold text-gray-800">
                                    {school.name}
                                </td>

                                <td className="p-5 text-gray-600">
                                    {school.email}
                                </td>

                                <td className="p-5 text-gray-600">
                                    {school.templateId || "N/A"}
                                </td>

                                <td className="p-5 text-center">

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                school._id,
                                                school.name
                                            )
                                        }
                                        className="
                                            inline-flex items-center gap-2
                                            bg-red-500 hover:bg-red-600
                                            text-white px-4 py-2
                                            rounded-xl font-semibold
                                            transition
                                        "
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

            {/* ================= MOBILE CARDS ================= */}
            <div className="lg:hidden space-y-4">

                {filteredSchools.map((school) => (

                    <div
                        key={school._id}
                        className="bg-white rounded-3xl p-5 shadow-sm border"
                    >

                        <div className="flex items-start justify-between gap-4">

                            <div>

                                <h2 className="text-xl font-bold text-gray-800">
                                    {school.name}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1 break-all">
                                    {school.email}
                                </p>

                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                <School size={22} />
                            </div>

                        </div>

                        <div className="mt-5">

                            <button
                                onClick={() =>
                                    handleDelete(
                                        school._id,
                                        school.name
                                    )
                                }
                                className="
                                    w-full flex items-center justify-center gap-2
                                    bg-red-500 hover:bg-red-600
                                    text-white py-3 rounded-2xl
                                    font-semibold transition
                                "
                            >

                                <Trash2 size={18} />

                                Delete School

                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}