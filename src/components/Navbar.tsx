"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import genixLogo from "../../public/genix-logo.png";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

                {/* 🔥 LOGO */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src={genixLogo} width={45} height={45} alt="logo" />
                    <span className="font-bold text-lg md:text-xl text-white">
                        Work GeniX
                    </span>
                </Link>

                {/* 🔥 DESKTOP MENU */}
                <div className="hidden md:flex items-center gap-8 font-medium text-white">

                    <Link href="/" className="hover:text-blue-300 transition">
                        Home
                    </Link>

                    <Link href="/dashboard" className="hover:text-blue-300 transition">
                        Dashboard
                    </Link>

                    <Link href="/dashboard/add-student" className="hover:text-blue-300 transition">
                        Add Student
                    </Link>

                    <Link href="/dashboard/students" className="hover:text-blue-300 transition">
                        Students
                    </Link>

                    {/* 🔥 CTA BUTTON */}
                    <Link
                        href="/dashboard/create-id"
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 rounded-lg text-white font-semibold shadow hover:scale-105 hover:brightness-110 transition"
                    >
                        Create ID
                    </Link>

                </div>

                {/* 🔥 MOBILE BUTTON */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white text-2xl"
                >
                    {menuOpen ? "✖" : "☰"}
                </button>
            </div>

            {/* 🔥 MOBILE MENU */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96" : "max-h-0"
                    }`}
            >
                <div className="px-4 pb-4 space-y-3 bg-black/70 backdrop-blur-md text-white">

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
                        className="block py-2 border-b border-white/20"
                    >
                        Students
                    </Link>

                    {/* 🔥 MOBILE CTA */}
                    <Link
                        href="/login"
                        onClick={() => setMenuOpen(false)}
                        className="block text-center bg-gradient-to-r from-blue-600 to-cyan-500 py-2 rounded-lg font-semibold"
                    >
                        Login
                    </Link>

                </div>
            </div>
        </nav>
    );
}