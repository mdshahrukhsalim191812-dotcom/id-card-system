"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    School,
    Users,
    Download,
    LogOut,
    Menu,
    X,
} from "lucide-react";

import { useState } from "react";
import { FaFileDownload } from "react-icons/fa";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const pathname = usePathname();

    const [open, setOpen] = useState(false);

    const menus = [
        {
            title: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            href: "/admin",
        },
        {
            title: "Schools",
            icon: <School size={20} />,
            href: "/admin/schools",
        },
        {
            title: "Students",
            icon: <Users size={20} />,
            href: "/admin/students",
        },
        {
            title: "Download ID Cards",
            icon: <Download size={20} />,
            href: "/admin/download-id",
        },
        {
            title: "Download Excel",
            icon: <FaFileDownload size={20} />,
            href: "/admin/download-excel",
        },
    ];

    return (
        <div className="min-h-screen bg-[#F4F7FB]">

            {/* MOBILE HEADER */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b h-16 flex items-center justify-between px-4">

                <h1 className="text-xl font-extrabold text-[#021B33]">
                    Work GeniX
                </h1>

                <button
                    onClick={() => setOpen(true)}
                    className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"
                >
                    <Menu size={22} />
                </button>

            </div>

            {/* MOBILE OVERLAY */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    fixed top-0 left-0 z-50 h-screen w-[280px]
                    bg-gradient-to-b from-[#021B33] to-[#063B6E]
                    text-white p-6 flex flex-col justify-between
                    transition-all duration-300

                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >

                <div>

                    {/* LOGO */}
                    <div className="flex items-center justify-between mb-10">

                        <div>

                            <h1 className="text-3xl font-extrabold">
                                Super Admin
                            </h1>

                            <p className="text-blue-200 mt-1 text-sm">
                                Work GeniX Panel
                            </p>

                        </div>

                        {/* MOBILE CLOSE */}
                        <button
                            onClick={() => setOpen(false)}
                            className="lg:hidden"
                        >
                            <X size={24} />
                        </button>

                    </div>

                    {/* MENUS */}
                    <div className="space-y-3">

                        {menus.map((menu, index) => {

                            const active = pathname === menu.href;

                            return (
                                <Link
                                    key={index}
                                    href={menu.href}
                                    onClick={() => setOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-medium

                                        ${active
                                            ? "bg-white text-[#021B33] shadow-lg"
                                            : "text-blue-100 hover:bg-white/10"}
                                    `}
                                >

                                    {menu.icon}

                                    {menu.title}

                                </Link>
                            );
                        })}

                    </div>

                </div>

                {/* LOGOUT */}
                <button
                    className="
                        w-full flex items-center justify-center gap-2
                        bg-red-500 hover:bg-red-600
                        py-3 rounded-2xl font-semibold transition
                    "
                >

                    <LogOut size={20} />

                    Logout

                </button>

            </aside>

            {/* MAIN CONTENT */}
            <main className="lg:ml-[280px] pt-16 lg:pt-0 min-h-screen">

                {children}

            </main>

        </div>
    );
}