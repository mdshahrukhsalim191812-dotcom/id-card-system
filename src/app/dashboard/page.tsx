"use client";

import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

import {
    Users,
    CreditCard,
    Clock3,
    ArrowRight,
    PlusCircle,
    LayoutDashboard,
} from "lucide-react";

export default function DashboardPage() {

    const stats = [
        {
            title: "Total Students",
            value: "120",
            icon: <Users size={30} />,
            color: "from-blue-600 to-cyan-500",
            bg: "bg-blue-50",
            text: "text-blue-600",
        },
        {
            title: "ID Cards Created",
            value: "95",
            icon: <CreditCard size={30} />,
            color: "from-green-600 to-emerald-500",
            bg: "bg-green-50",
            text: "text-green-600",
        },
        {
            title: "Pending Orders",
            value: "25",
            icon: <Clock3 size={30} />,
            color: "from-orange-500 to-yellow-400",
            bg: "bg-orange-50",
            text: "text-orange-500",
        },
    ];

    return (
        <div className="min-h-screen bg-[#F4F7FB]">

            {/* ================= HEADER ================= */}
            <div className="bg-gradient-to-r from-[#021B33] via-[#04284B] to-[#063B6E] text-white">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                        {/* LEFT */}
                        <div className="flex items-start gap-4">

                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                                <LayoutDashboard size={32} />
                            </div>

                            <div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                                    Dashboard
                                </h1>

                                <p className="text-blue-100 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
                                    Welcome back! Manage students, generate professional ID cards
                                    and monitor printing services from one dashboard.
                                </p>
                            </div>

                        </div>

                        {/* RIGHT BUTTONS */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">

                            <Link
                                href="/dashboard/students"
                                className="group flex items-center justify-center gap-2 bg-white text-[#021B33] hover:bg-blue-50 font-semibold px-5 py-3 rounded-2xl shadow-lg transition-all duration-300 w-full sm:w-auto"
                            >
                                <Users size={18} />

                                Students

                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition"
                                />
                            </Link>

                            <Link
                                href="/dashboard/create-id"
                                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] text-white font-semibold px-5 py-3 rounded-2xl shadow-lg transition-all duration-300 w-full sm:w-auto"
                            >
                                <PlusCircle size={20} />

                                Create ID Card
                            </Link>

                            <div className="w-full sm:w-auto">
                                <LogoutButton />
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

                {/* ================= STATS ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">

                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 p-5 sm:p-6 border border-gray-100"
                        >

                            {/* Gradient Background */}
                            <div
                                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${item.color} opacity-10`}
                            />

                            {/* CONTENT */}
                            <div className="relative z-10 flex items-center justify-between">

                                <div>

                                    <p className="text-gray-500 text-sm sm:text-base font-medium">
                                        {item.title}
                                    </p>

                                    <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 text-gray-800">
                                        {item.value}
                                    </h2>

                                </div>

                                <div
                                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center ${item.bg} ${item.text}`}
                                >
                                    {item.icon}
                                </div>

                            </div>

                        </div>
                    ))}

                </div>

                {/* ================= QUICK ACTIONS ================= */}
                <div className="mt-10 sm:mt-14">

                    <div className="flex items-center justify-between mb-6">

                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                                Quick Actions
                            </h2>

                            <p className="text-gray-500 mt-1 text-sm sm:text-base">
                                Access important tools quickly.
                            </p>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {/* STUDENTS */}
                        <Link
                            href="/dashboard/students"
                            className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                        >

                            <div className="flex items-start justify-between gap-4">

                                <div>

                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                                        Manage Students
                                    </h3>

                                    <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                                        Add, update and manage all student records easily.
                                    </p>

                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                    <Users size={28} />
                                </div>

                            </div>

                            <div className="mt-8 flex items-center text-blue-600 font-semibold">
                                Open

                                <ArrowRight
                                    size={18}
                                    className="ml-2 group-hover:translate-x-1 transition"
                                />
                            </div>

                        </Link>

                        {/* CREATE ID */}
                        <Link
                            href="/dashboard/create-id"
                            className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                        >

                            <div className="flex items-start justify-between gap-4">

                                <div>

                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                                        Create ID Cards
                                    </h3>

                                    <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                                        Generate professional school ID cards instantly.
                                    </p>

                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                    <CreditCard size={28} />
                                </div>

                            </div>

                            <div className="mt-8 flex items-center text-green-600 font-semibold">
                                Create

                                <ArrowRight
                                    size={18}
                                    className="ml-2 group-hover:translate-x-1 transition"
                                />
                            </div>

                        </Link>

                        {/* PRINTING */}
                        <div className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">

                            <div className="flex items-start justify-between gap-4">

                                <div>

                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                                        Printing Services
                                    </h3>

                                    <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                                        Monitor printing requests and pending orders.
                                    </p>

                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                                    <Clock3 size={28} />
                                </div>

                            </div>

                            <div className="mt-8 flex items-center text-orange-500 font-semibold">
                                Coming Soon
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}