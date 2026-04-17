"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import genixLogo from "../../public/genix-logo.png";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-blue-800 via-violet-600 to-blue-950 text-white">
            <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">

                {/* 🔥 LEFT: LOGO + NAME */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src={genixLogo} width={45} height={45} alt="logo" />
                    <span className="font-bold text-lg md:text-xl">
                        Work GeniX
                    </span>
                </Link>

                {/* 🔥 DESKTOP MENU */}
                <div className="hidden md:flex gap-6 font-medium">
                    <Link href="/" className="hover:text-gray-200 transition">
                        Home
                    </Link>
                    <Link href="/dashboard" className="hover:text-gray-200 transition">
                        Dashboard
                    </Link>
                    <Link href="/dashboard/add-student" className="hover:text-gray-200 transition">
                        Add Student
                    </Link>
                    <Link href="/dashboard/students" className="hover:text-gray-200 transition">
                        Students
                    </Link>
                </div>

                {/* 🔥 MOBILE MENU BUTTON */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-2xl"
                >
                    {menuOpen ? "✖" : "☰"}
                </button>
            </div>

            {/* 🔥 MOBILE MENU */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3 bg-gradient-to-b from-blue-900 to-blue-800">
                    <Link
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className="block py-2 border-b border-white/20"
                    >
                        Home
                    </Link>
                    <Link
                        href="/dashboard"
                        onClick={() => setMenuOpen(false)}
                        className="block py-2 border-b border-white/20"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/dashboard/add-student"
                        onClick={() => setMenuOpen(false)}
                        className="block py-2 border-b border-white/20"
                    >
                        Add Student
                    </Link>
                    <Link
                        href="/dashboard/students"
                        onClick={() => setMenuOpen(false)}
                        className="block py-2"
                    >
                        Students
                    </Link>
                </div>
            )}
        </nav>
    );
}