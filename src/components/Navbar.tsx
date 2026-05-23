"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import genixLogo from "../../public/genix-logo.png";
import { Menu } from "lucide-react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-[#021B33] text-white sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <Link href="/">
                        <Image
                            src="/genix-logo.png"
                            alt="logo"
                            width={50}
                            height={50}
                        />
                    </Link>

                    <div>
                        <Link href="/">
                            <h1 className="font-bold text-xl sm:text-2xl">
                                Work GeniX
                            </h1>
                        </Link>

                        <p className="text-xs sm:text-sm text-gray-300">
                            Printing | Designing | Branding
                        </p>
                    </div>
                </div>

                <nav className="hidden lg:flex gap-8 font-medium">
                    <a href="/" className="hover:text-blue-400">Home</a>
                    <a href="/dashboard" className="hover:text-blue-400">Dashboard</a>
                    <a href="/products" className="hover:text-blue-400">Products</a>
                    <a href="#" className="hover:text-blue-400">Services</a>
                    <a href="#" className="hover:text-blue-400">Gallery</a>
                    <a href="contact" className="hover:text-blue-400">Contact</a>
                </nav>

                <button className="lg:hidden">
                    <Menu size={30} />
                </button>
            </div>
        </header>
    );
}