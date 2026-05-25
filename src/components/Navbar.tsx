"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
    Menu,
    X
} from "lucide-react";

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Products", href: "/products" },
        { name: "Contact", href: "/contact" },
    ];

    return (

        <header className="
            bg-[#021B33]/95
            backdrop-blur-md
            text-white
            sticky top-0 z-50
            shadow-lg
            border-b border-white/10
        ">

            <div className="
                max-w-7xl mx-auto
                px-4 sm:px-6
                py-4
                flex items-center justify-between
            ">

                {/* LOGO */}
                <div className="flex items-center gap-3">

                    <Link href="/" className="flex items-center gap-3">

                        <Image
                            src="/genix-logo.png"
                            alt="logo"
                            width={50}
                            height={50}
                            className="object-contain"
                        />

                        <div>

                            <h1 className="
                                font-bold
                                text-xl sm:text-2xl
                            ">
                                Work GeniX
                            </h1>

                            <p className="
                                text-xs sm:text-sm
                                text-gray-300
                            ">
                                Printing | Designing | Branding
                            </p>

                        </div>

                    </Link>

                </div>

                {/* DESKTOP MENU */}
                <nav className="
                    hidden lg:flex
                    items-center gap-8
                    font-medium
                ">

                    {navLinks.map((item, index) => (

                        <Link
                            key={index}
                            href={item.href}
                            className="
                                relative
                                hover:text-blue-400
                                transition
                                duration-300
                                group
                            "
                        >

                            {item.name}

                            <span className="
                                absolute
                                left-0 -bottom-1
                                h-[2px]
                                w-0
                                bg-blue-400
                                transition-all duration-300
                                group-hover:w-full
                            "></span>

                        </Link>

                    ))}

                </nav>

                {/* MOBILE BUTTON */}
                <button
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                    className="
                        lg:hidden
                        p-2 rounded-xl
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

            {/* MOBILE MENU */}
            <div className={`
                lg:hidden
                overflow-hidden
                transition-all duration-500
                ${menuOpen
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }
            `}>

                <div className="
                    px-4 pb-6
                    bg-[#021B33]
                    border-t border-white/10
                    flex flex-col gap-2
                ">

                    {navLinks.map((item, index) => (

                        <Link
                            key={index}
                            href={item.href}

                            onClick={() =>
                                setMenuOpen(false)
                            }

                            className="
                                px-4 py-3
                                rounded-xl
                                hover:bg-white/10
                                hover:text-blue-400
                                transition-all duration-300
                                font-medium
                            "
                        >

                            {item.name}

                        </Link>

                    ))}

                </div>

            </div>

        </header>
    );
}