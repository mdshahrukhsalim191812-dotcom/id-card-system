"use client";

import { useEffect, useState } from "react";

import {
    School,
    Users,
    CreditCard,
    Activity,
    ArrowUpRight,
} from "lucide-react";

type SchoolType = {
    _id: string;
    name: string;
    email: string;
};

type StudentType = {
    _id: string;
    name: string;
    class: string;

    schoolId?: {
        name: string;
    };
};

export default function AdminDashboard() {

    const [schools, setSchools] = useState<SchoolType[]>([]);
    const [students, setStudents] = useState<StudentType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const [schoolsRes, studentsRes] = await Promise.all([
                    fetch("/api/admin/schools"),
                    fetch("/api/admin/students"),
                ]);

                const schoolsData = await schoolsRes.json();
                const studentsData = await studentsRes.json();

                setSchools(schoolsData);
                setStudents(studentsData);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

        fetchData();

    }, []);

    // LOADING
    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F4F7FB]">

                <div className="flex flex-col items-center">

                    <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                    <p className="mt-4 text-gray-600 font-medium">
                        Loading dashboard...
                    </p>

                </div>

            </div>
        );
    }

    const stats = [
        {
            title: "Total Schools",
            value: schools.length,
            icon: <School size={28} />,
            color: "bg-blue-100 text-blue-600",
        },
        {
            title: "Total Students",
            value: students.length,
            icon: <Users size={28} />,
            color: "bg-green-100 text-green-600",
        },
        {
            title: "ID Cards Generated",
            value: students.length,
            icon: <CreditCard size={28} />,
            color: "bg-orange-100 text-orange-500",
        },
        {
            title: "Active Schools",
            value: schools.length,
            icon: <Activity size={28} />,
            color: "bg-purple-100 text-purple-600",
        },
    ];

    return (
        <div className="min-h-screen bg-[#F4F7FB] p-4 sm:p-6">

            {/* HEADER */}
            <div className="mb-8">

                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                    Super Admin Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Monitor all schools, students and ID card activities.
                </p>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                {stats.map((item, index) => (

                    <div
                        key={index}
                        className="bg-white rounded-3xl p-6 shadow-sm border hover:shadow-xl transition"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 text-sm">
                                    {item.title}
                                </p>

                                <h2 className="text-4xl font-extrabold mt-2 text-gray-800">
                                    {item.value}
                                </h2>

                            </div>

                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
                                {item.icon}
                            </div>

                        </div>

                        <div className="mt-5 flex items-center text-green-600 text-sm font-semibold">

                            <ArrowUpRight size={16} />

                            <span className="ml-1">
                                Active Data
                            </span>

                        </div>

                    </div>

                ))}

            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

                {/* RECENT SCHOOLS */}
                <div className="xl:col-span-1 bg-white rounded-3xl p-6 shadow-sm border">

                    <div className="flex items-center justify-between mb-5">

                        <h2 className="text-2xl font-bold text-gray-800">
                            Recent Schools
                        </h2>

                        <span className="text-sm text-gray-500">
                            {schools.length} Schools
                        </span>

                    </div>

                    <div className="space-y-4">

                        {schools.slice(0, 5).map((school) => (

                            <div
                                key={school._id}
                                className="flex items-center justify-between border-b pb-3"
                            >

                                <div>

                                    <h3 className="font-semibold text-gray-800">
                                        {school.name}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {school.email}
                                    </p>

                                </div>

                                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <School size={18} />
                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* RECENT STUDENTS */}
                <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm border">

                    <div className="flex items-center justify-between mb-5">

                        <h2 className="text-2xl font-bold text-gray-800">
                            Recent Students
                        </h2>

                        <span className="text-sm text-gray-500">
                            {students.length} Students
                        </span>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[700px]">

                            <thead>

                                <tr className="text-left border-b">

                                    <th className="pb-4 text-gray-500 font-semibold">
                                        Student
                                    </th>

                                    <th className="pb-4 text-gray-500 font-semibold">
                                        Class
                                    </th>

                                    <th className="pb-4 text-gray-500 font-semibold">
                                        School
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {students.slice(0, 8).map((student) => (

                                    <tr
                                        key={student._id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >

                                        <td className="py-4 font-semibold text-gray-800">
                                            {student.name}
                                        </td>

                                        <td className="py-4">
                                            {student.class}
                                        </td>

                                        <td className="py-4">
                                            {student.schoolId?.name}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}