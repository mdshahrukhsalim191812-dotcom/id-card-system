"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
    Menu,
    X,
    LogIn,
} from "lucide-react";

export default function Navbar() {

    const [menuOpen, setMenuOpen] =
        useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Products", href: "/products" },
        { name: "Contact", href: "/contact" },
    ];

    return (

        <header
            className="
                sticky top-0 z-50
                bg-[#021B33]/90
                backdrop-blur-xl
                border-b border-white/10
                shadow-lg shadow-black/10
            "
        >

            {/* ================= CONTAINER ================= */}
            <div
                className="
                    max-w-7xl mx-auto
                    px-4 sm:px-6 lg:px-8
                    h-[82px]
                    flex items-center justify-between
                "
            >

                {/* ================= LOGO ================= */}
                <Link
                    href="/"
                    className="
                        flex items-center
                        gap-3
                        group
                    "
                >

                    {/* Logo */}
                    <div
                        className="
                            relative
                            w-12 h-12 sm:w-14 sm:h-14
                            flex items-center justify-center
                        "
                    >

                        <div
                            className="
                                absolute inset-0
                                bg-cyan-400/20
                                blur-2xl
                                rounded-full
                                opacity-0
                                group-hover:opacity-100
                                transition duration-500
                            "
                        />

                        <Image
                            src="/genix-logo.png"
                            alt="Work GeniX"
                            width={56}
                            height={56}
                            className="
                                object-contain
                                relative z-10
                            "
                            priority
                        />

                    </div>

                    {/* Brand */}
                    <div className="leading-tight">

                        <h1
                            className="
                                text-xl sm:text-2xl
                                font-extrabold
                                tracking-wide
                                text-white
                            "
                        >

                            Work{" "}

                            <span className="text-cyan-400">
                                GeniX
                            </span>

                        </h1>

                        <p
                            className="
                                text-[10px] sm:text-xs
                                text-gray-300
                            "
                        >
                            Printing | Designing | Branding
                        </p>

                    </div>

                </Link>

                {/* ================= DESKTOP NAV ================= */}
                <div
                    className="
                        hidden lg:flex
                        items-center gap-8
                    "
                >

                    {/* Links */}
                    <nav
                        className="
                            flex items-center gap-7
                            text-sm font-medium
                        "
                    >

                        {navLinks.map((item, index) => (

                            <Link
                                key={index}
                                href={item.href}
                                className="
                                    relative
                                    text-gray-200
                                    hover:text-cyan-400
                                    transition-all duration-300
                                    group
                                "
                            >

                                {item.name}

                                <span
                                    className="
                                        absolute
                                        left-0 -bottom-1
                                        h-[2px]
                                        w-0
                                        bg-cyan-400
                                        transition-all duration-300
                                        group-hover:w-full
                                    "
                                />

                            </Link>

                        ))}

                    </nav>

                    {/* ================= LOGIN BUTTON ================= */}
                    <Link
                        href="/login"
                        className="
                            relative overflow-hidden
                            flex items-center gap-2
                            px-6 py-3
                            rounded-2xl
                            font-semibold
                            text-white
                            bg-gradient-to-r
                            from-cyan-500
                            via-blue-500
                            to-cyan-400
                            hover:scale-105
                            active:scale-95
                            transition-all duration-300
                            shadow-lg
                            shadow-cyan-500/30
                            group
                        "
                    >

                        {/* Glow */}
                        <span
                            className="
                                absolute inset-0
                                bg-white/10
                                opacity-0
                                group-hover:opacity-100
                                transition duration-300
                            "
                        />

                        <LogIn size={18} />

                        <span className="relative z-10">
                            Login
                        </span>

                    </Link>

                </div>

                {/* ================= MOBILE MENU BUTTON ================= */}
                <button
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                    className="
                        lg:hidden
                        p-2.5
                        rounded-xl
                        text-white
                        hover:bg-white/10
                        transition
                    "
                >

                    {menuOpen ? (
                        <X size={30} />
                    ) : (
                        <Menu size={30} />
                    )}

                </button>

            </div>

            {/* ================= MOBILE MENU ================= */}
            <div
                className={`
                    lg:hidden
                    overflow-hidden
                    transition-all duration-500
                    ${menuOpen
                        ? "max-h-[600px] opacity-100"
                        : "max-h-0 opacity-0"
                    }
                `}
            >

                <div
                    className="
                        bg-[#021B33]/95
                        backdrop-blur-xl
                        border-t border-white/10
                        px-4 py-5
                        flex flex-col gap-3
                    "
                >

                    {/* Nav Links */}
                    {navLinks.map((item, index) => (

                        <Link
                            key={index}
                            href={item.href}

                            onClick={() =>
                                setMenuOpen(false)
                            }

                            className="
                                px-4 py-3
                                rounded-2xl
                                text-gray-200
                                hover:text-cyan-400
                                hover:bg-white/10
                                transition-all duration-300
                                font-medium
                            "
                        >

                            {item.name}

                        </Link>

                    ))}

                    {/* ================= MOBILE LOGIN BUTTON ================= */}
                    <Link
                        href="/login"

                        onClick={() =>
                            setMenuOpen(false)
                        }

                        className="
                            mt-2
                            flex items-center justify-center gap-2
                            px-5 py-3.5
                            rounded-2xl
                            font-semibold
                            text-white
                            bg-gradient-to-r
                            from-cyan-500
                            via-blue-500
                            to-cyan-400
                            shadow-lg
                            shadow-cyan-500/30
                            hover:scale-[1.02]
                            active:scale-[0.98]
                            transition-all duration-300
                        "
                    >

                        <LogIn size={18} />

                        Login

                    </Link>

                </div>

            </div>

        </header>
    );
}