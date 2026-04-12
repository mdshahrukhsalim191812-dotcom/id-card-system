"use client";

import Link from "next/link";
import LogoutButton from "@/components/LogoutButton"

export default function DashboardPage() {
    const stats = [
        { title: "Total Students", value: 120 },
        { title: "ID Cards Created", value: 95 },
        { title: "Pending Orders", value: 25 },
    ];

    return (
        <div className="p-6">

            {/* Title */}
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-md"
                    >
                        <h2 className="text-gray-500">{item.title}</h2>
                        <p className="text-2xl font-bold mt-2">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-4 justify-center">
                <Link
                    href="/dashboard/students"
                    className="font-semibold bg-gradient-to-r from-blue-500 to-blue-900 hover:bg-gradient-to-l from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg"
                >
                    Students
                </Link>

                <Link
                    href="/dashboard/create-id"
                    className="font-semibold bg-gradient-to-r from-green-700 to-green-500 hover:bg-gradient-to-l from-green-500 to-green-700 text-white px-4 py-2 rounded-lg"
                >
                    Create ID Card
                </Link>
                <LogoutButton />
            </div>
        </div>
    );
}