"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    Search,
    Users,
    School,
    GraduationCap,
    Trash2,
} from "lucide-react";

type Student = {
    _id: string;
    name: string;
    class: string;
    roll: string;
    admissionNo?: string;

    schoolId?: {
        _id: string;
        name: string;
        email: string;
    };
};

export default function AdminStudentsPage() {

    const [students, setStudents] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [search, setSearch] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [loading, setLoading] = useState(true);

    // FETCH STUDENTS
    useEffect(() => {

        const fetchStudents = async () => {

            try {

                const res = await fetch("/api/admin/students");

                const data = await res.json();

                setStudents(data);
                setFilteredStudents(data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

        fetchStudents();

    }, []);

    // FILTER
    useEffect(() => {

        let filtered = students;

        // SEARCH
        if (search) {

            filtered = filtered.filter((student) =>
                student.name.toLowerCase().includes(search.toLowerCase()) ||
                student.class.toLowerCase().includes(search.toLowerCase()) ||
                student.roll.toLowerCase().includes(search.toLowerCase())
            );
        }

        // SCHOOL FILTER
        if (selectedSchool) {

            filtered = filtered.filter(
                (student) => student.schoolId?._id === selectedSchool
            );
        }

        setFilteredStudents(filtered);

    }, [search, selectedSchool, students]);

    // UNIQUE SCHOOLS
    const schools = Array.from(
        new Map(
            students.map((s) => [
                s.schoolId?._id,
                s.schoolId,
            ])
        ).values()
    );

    // LOADING
    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F4F7FB]">

                <div className="flex flex-col items-center">

                    <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                    <p className="mt-4 text-gray-600 font-medium">
                        Loading students...
                    </p>

                </div>

            </div>
        );
    }

    const handleDelete = async (
        id: string,
        studentName: string
    ) => {

        toast((t) => (

            <div className="flex flex-col gap-4">

                <div>

                    <h2 className="font-bold text-gray-800 text-lg">
                        Delete Student?
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {studentName} will be permanently deleted.
                    </p>

                </div>

                <div className="flex justify-end gap-3">

                    {/* CANCEL */}
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

                    {/* DELETE */}
                    <button
                        onClick={async () => {

                            toast.dismiss(t.id);

                            const loadingToast = toast.loading(
                                "Deleting student..."
                            );

                            try {

                                const res = await fetch(
                                    `/api/students?id=${id}`,
                                    {
                                        method: "DELETE",
                                    }
                                );

                                const data = await res.json();

                                toast.dismiss(loadingToast);

                                if (data.success) {

                                    setStudents((prev) =>
                                        prev.filter(
                                            (student) =>
                                                student._id !== id
                                        )
                                    );

                                    toast.success(
                                        "Student deleted successfully"
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

    return (
        <div className="min-h-screen bg-[#F4F7FB] p-4 sm:p-6">

            {/* HEADER */}
            <div className="mb-8">

                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                    Students Management
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage all schools students from one panel.
                </p>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

                <div className="bg-white rounded-3xl p-6 shadow-sm border">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Total Students
                            </p>

                            <h2 className="text-4xl font-extrabold mt-2 text-blue-600">
                                {students.length}
                            </h2>

                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                            <Users size={28} />
                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Total Schools
                            </p>

                            <h2 className="text-4xl font-extrabold mt-2 text-green-600">
                                {schools.length}
                            </h2>

                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                            <School size={28} />
                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Showing Results
                            </p>

                            <h2 className="text-4xl font-extrabold mt-2 text-orange-500">
                                {filteredStudents.length}
                            </h2>

                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500">
                            <GraduationCap size={28} />
                        </div>

                    </div>

                </div>

            </div>

            {/* FILTERS */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border mb-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* SEARCH */}
                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search students..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                    </div>

                    {/* FILTER */}
                    <select
                        value={selectedSchool}
                        onChange={(e) => setSelectedSchool(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    >

                        <option value="">
                            All Schools
                        </option>

                        {schools.map((school: any) => (

                            <option
                                key={school?._id}
                                value={school?._id}
                            >
                                {school?.name}
                            </option>

                        ))}

                    </select>

                </div>

            </div>

            {/* TABLE DESKTOP */}
            <div className="hidden lg:block bg-white rounded-3xl shadow-sm border overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr className="text-left">

                            <th className="p-5 font-bold text-gray-700">
                                Student
                            </th>

                            <th className="p-5 font-bold text-gray-700">
                                Class
                            </th>

                            <th className="p-5 font-bold text-gray-700">
                                Roll
                            </th>

                            <th className="p-5 font-bold text-gray-700">
                                School
                            </th>

                            <th className="p-5 font-bold text-gray-700 text-center">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredStudents.map((student) => (

                            <tr
                                key={student._id}
                                className="border-t hover:bg-gray-50 transition"
                            >

                                <td className="p-5 font-semibold text-gray-800">
                                    {student.name}
                                </td>

                                <td className="p-5">
                                    {student.class}
                                </td>

                                <td className="p-5">
                                    {student.roll}
                                </td>

                                <td className="p-5">
                                    {student.schoolId?.name}
                                </td>

                                <td className="p-5 text-center">

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                student._id,
                                                student.name
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

            {/* MOBILE CARDS */}
            <div className="lg:hidden space-y-4">

                {filteredStudents.map((student) => (

                    <div
                        key={student._id}
                        className="bg-white rounded-3xl p-5 shadow-sm border"
                    >

                        <div className="flex items-start justify-between gap-4">

                            <div>

                                <h2 className="text-xl font-bold text-gray-800">
                                    {student.name}
                                </h2>

                                <p className="text-gray-500 mt-1 text-sm">
                                    {student.schoolId?.name}
                                </p>

                            </div>

                            <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                                Class {student.class}
                            </div>

                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm">

                            <div>
                                <p className="text-gray-400">
                                    Roll
                                </p>

                                <p className="font-semibold text-gray-700">
                                    {student.roll}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-400">
                                    Admission No
                                </p>

                                <p className="font-semibold text-gray-700">
                                    {student.admissionNo || "N/A"}
                                </p>
                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}