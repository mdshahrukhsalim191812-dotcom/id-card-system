"use client";

import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardPage() {
    const stats = [
        { title: "Total Students", value: 120 },
        { title: "ID Cards Created", value: 95 },
        { title: "Pending Orders", value: 25 },
    ];

    return (
        <div className="p-4 md:p-6">

            {/* 🔥 TITLE */}
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
                Dashboard
            </h1>

            {/* 🔥 STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition"
                    >
                        <h2 className="text-gray-500 text-sm md:text-base">
                            {item.title}
                        </h2>
                        <p className="text-xl md:text-2xl font-bold mt-2">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* 🔥 ACTION BUTTONS */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start items-center">

                <Link
                    href="/dashboard/students"
                    className="w-full sm:w-auto text-center font-semibold bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-lg transition"
                >
                    Students
                </Link>

                <Link
                    href="/dashboard/create-id"
                    className="w-full sm:w-auto text-center font-semibold bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-lg transition"
                >
                    Create ID Card
                </Link>

                <div className="w-full sm:w-auto">
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
}