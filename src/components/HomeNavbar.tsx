"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import {
    Menu,
    X,
    LogIn,
    ChevronRight,
} from "lucide-react";

export default function Navbar() {

    const [menuOpen, setMenuOpen] =
        useState(false);

    const [scrolled, setScrolled] =
        useState(false);

    useEffect(() => {

        const handleScroll = () => {

            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

        };

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );

    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Products", href: "/products" },
        { name: "Contact", href: "/contact" },
    ];

    return (

        <header
            className={`
                fixed
                inset-x-0
                top-0
                z-[999]

                transition-all duration-500

                ${scrolled
                    ? `
                        bg-[#021B33]/80
                        backdrop-blur-2xl
                        border-b border-cyan-400/10
                        shadow-[0_10px_50px_rgba(0,0,0,0.45)]
                    `
                    : `
                        bg-transparent
                    `
                }
            `}
        >

            {/* ================= TOP GLOW ================= */}
            <div
                className="
                    absolute
                    inset-0

                    overflow-hidden

                    pointer-events-none
                "
            >

                <div
                    className="
                        absolute
                        -top-24
                        left-1/2
                        -translate-x-1/2

                        w-[500px]
                        h-[200px]

                        bg-cyan-400/10

                        blur-[120px]

                        rounded-full
                    "
                ></div>

            </div>

            {/* ================= CONTAINER ================= */}
            <div
                className="
                    relative z-10

                    w-full

                    px-4
                    sm:px-6
                    lg:px-10
                "
            >

                <div
                    className="
                        h-[82px]

                        flex items-center
                        justify-between
                    "
                >

                    {/* ================= LOGO ================= */}
                    <Link
                        href="/"
                        className="
                            flex items-center
                            gap-3

                            shrink-0

                            group
                        "
                    >

                        {/* LOGO BOX */}
                        <div
                            className="
                                relative

                                w-12 h-12
                                sm:w-14 sm:h-14

                                rounded-2xl

                                bg-white/[0.06]
                                backdrop-blur-2xl

                                border border-white/10

                                flex items-center justify-center

                                shadow-[0_10px_30px_rgba(0,0,0,0.35)]

                                overflow-hidden
                            "
                        >

                            {/* Glow */}
                            <div
                                className="
                                    absolute
                                    inset-0

                                    bg-gradient-to-br
                                    from-cyan-400/20
                                    to-blue-500/20

                                    opacity-0
                                    group-hover:opacity-100

                                    transition-all duration-500
                                "
                            ></div>

                            <Image
                                src="/genix-logo.png"
                                alt="Work GeniX"
                                width={42}
                                height={42}
                                priority
                                className="
                                    relative z-10
                                    object-contain
                                "
                            />

                        </div>

                        {/* BRAND */}
                        <div className="leading-tight">

                            <h1
                                className="
                                    text-xl
                                    sm:text-2xl

                                    font-black

                                    tracking-wide

                                    text-white
                                "
                            >

                                Work{" "}

                                <span
                                    className="
                                        bg-gradient-to-r
                                        from-cyan-300
                                        via-blue-300
                                        to-cyan-400

                                        bg-clip-text
                                        text-transparent
                                    "
                                >
                                    GeniX
                                </span>

                            </h1>

                            <p
                                className="
                                    text-[10px]
                                    sm:text-xs

                                    text-gray-300

                                    mt-1
                                "
                            >
                                Printing • Branding • Designing
                            </p>

                        </div>

                    </Link>

                    {/* ================= DESKTOP NAV ================= */}
                    <div
                        className="
                            hidden lg:flex
                            items-center gap-5
                        "
                    >

                        {/* MENU */}
                        <nav
                            className="
                                flex items-center gap-2

                                p-2

                                rounded-2xl

                                bg-white/[0.04]
                                backdrop-blur-2xl

                                border border-white/10
                            "
                        >

                            {navLinks.map((item, index) => (

                                <Link
                                    key={index}
                                    href={item.href}
                                    className="
                                        relative

                                        px-5 py-3

                                        rounded-xl

                                        text-sm
                                        font-semibold

                                        text-gray-200

                                        hover:text-white
                                        hover:bg-white/[0.08]

                                        transition-all duration-300

                                        group
                                    "
                                >

                                    {item.name}

                                    {/* Hover Line */}
                                    <span
                                        className="
                                            absolute
                                            left-1/2
                                            -translate-x-1/2
                                            bottom-1

                                            h-[2px]
                                            w-0

                                            bg-gradient-to-r
                                            from-cyan-400
                                            to-blue-500

                                            rounded-full

                                            group-hover:w-8

                                            transition-all duration-300
                                        "
                                    ></span>

                                </Link>

                            ))}

                        </nav>

                        {/* ================= LOGIN BUTTON ================= */}
                        <Link
                            href="/login"
                            className="
                                group
                                relative

                                overflow-hidden

                                flex items-center gap-2

                                px-6 py-3

                                rounded-2xl

                                font-semibold

                                text-white

                                bg-gradient-to-r
                                from-blue-500
                                via-blue-600
                                to-blue-800

                                hover:scale-105
                                active:scale-95

                                transition-all duration-300

                                shadow-[0_10px_40px_rgba(34,211,238,0.35)]
                            "
                        >

                            {/* Shine */}
                            <span
                                className="
                                    absolute
                                    inset-0

                                    -translate-x-full

                                    bg-gradient-to-r
                                    from-transparent
                                    via-white/20
                                    to-transparent

                                    group-hover:translate-x-full

                                    transition-all duration-1000
                                "
                            ></span>

                            <LogIn
                                size={18}
                                className="relative z-10"
                            />

                            <span className="relative z-10">
                                Login
                            </span>

                            <ChevronRight
                                size={18}
                                className="
                                    relative z-10

                                    group-hover:translate-x-1

                                    transition-transform duration-300
                                "
                            />

                        </Link>

                    </div>

                    {/* ================= MOBILE BUTTON ================= */}
                    <button
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                        className="
                            lg:hidden

                            w-12 h-12

                            rounded-2xl

                            bg-white/[0.06]
                            backdrop-blur-2xl

                            border border-white/10

                            text-white

                            flex items-center justify-center

                            shadow-lg

                            hover:bg-white/[0.1]

                            transition-all duration-300
                        "
                    >

                        {menuOpen
                            ? <X size={28} />
                            : <Menu size={28} />
                        }

                    </button>

                </div>

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
                        relative

                        bg-[#021B33]/95
                        backdrop-blur-2xl

                        border-t border-white/10

                        px-4
                        py-5

                        flex flex-col
                        gap-3
                    "
                >

                    {/* LINKS */}
                    {navLinks.map((item, index) => (

                        <Link
                            key={index}
                            href={item.href}

                            onClick={() =>
                                setMenuOpen(false)
                            }

                            className="
                                flex items-center
                                justify-between

                                px-5 py-4

                                rounded-2xl

                                bg-white/[0.04]

                                border border-white/10

                                text-gray-200

                                hover:text-cyan-300
                                hover:border-cyan-400/30
                                hover:bg-white/[0.08]

                                transition-all duration-300
                            "
                        >

                            {item.name}

                            <ChevronRight size={18} />

                        </Link>

                    ))}

                    {/* MOBILE LOGIN */}
                    <Link
                        href="/login"

                        onClick={() =>
                            setMenuOpen(false)
                        }

                        className="
                            group

                            mt-2

                            relative

                            overflow-hidden

                            flex items-center
                            justify-center
                            gap-2

                            px-5 py-4

                            rounded-2xl

                            font-semibold

                            text-white

                            bg-gradient-to-r
                            from-cyan-500
                            via-blue-600
                            to-cyan-500

                            shadow-[0_10px_40px_rgba(34,211,238,0.35)]

                            hover:scale-[1.02]
                            active:scale-[0.98]

                            transition-all duration-300
                        "
                    >

                        <span
                            className="
                                absolute
                                inset-0

                                -translate-x-full

                                bg-gradient-to-r
                                from-transparent
                                via-white/20
                                to-transparent

                                group-hover:translate-x-full

                                transition-all duration-1000
                            "
                        ></span>

                        <LogIn
                            size={18}
                            className="relative z-10"
                        />

                        <span className="relative z-10">
                            Login
                        </span>

                    </Link>

                </div>

            </div>

        </header>
    );
}