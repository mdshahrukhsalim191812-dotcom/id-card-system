"use client";

import Link from "next/link";

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
            <div className="mt-8 flex gap-4">
                <Link
                    href="/dashboard/add-student"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Add Student
                </Link>

                <Link
                    href="/dashboard/create-id"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                    Create ID Card
                </Link>
            </div>

        </div>
    );
}