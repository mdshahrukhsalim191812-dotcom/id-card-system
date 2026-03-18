"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
            <Link href="/" className="text-xl font-bold">
                Genix Graphic
            </Link>

            <div className="space-x-4">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/add-student">Add Student</Link>
                <Link href="/dashboard/students">Students</Link>
            </div>
        </div>
    );
}