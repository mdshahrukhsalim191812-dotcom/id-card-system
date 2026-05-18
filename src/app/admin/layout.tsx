"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    School,
    Users,
    Settings,
    LogOut,
} from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="min-h-screen bg-[#F4F7FB] flex">

            {/* SIDEBAR */}
            <aside className="w-[260px] bg-[#021B33] text-white hidden md:flex flex-col">

                {/* LOGO */}
                <div className="p-6 border-b border-white/10">

                    <h1 className="text-2xl font-bold">
                        Super Admin
                    </h1>

                    <p className="text-sm text-blue-200 mt-1">
                        Work GeniX Panel
                    </p>

                </div>

                {/* MENU */}
                <nav className="flex-1 p-4 space-y-2">

                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>

                    <Link
                        href="/admin/schools"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
                    >
                        <School size={20} />
                        Schools
                    </Link>

                    <Link
                        href="/admin/students"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
                    >
                        <Users size={20} />
                        Students
                    </Link>

                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
                    >
                        <Settings size={20} />
                        Settings
                    </Link>

                </nav>

                {/* FOOTER */}
                <div className="p-4 border-t border-white/10">

                    <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-3 rounded-xl transition">

                        <LogOut size={18} />

                        Logout

                    </button>

                </div>

            </aside>

            {/* MAIN */}
            <main className="flex-1">

                {/* TOPBAR */}
                <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-800">
                            Admin Panel
                        </h2>

                        <p className="text-gray-500 text-sm">
                            Manage schools and students
                        </p>

                    </div>

                </div>

                {/* PAGE CONTENT */}
                <div className="p-6">
                    {children}
                </div>

            </main>

        </div>
    );
}