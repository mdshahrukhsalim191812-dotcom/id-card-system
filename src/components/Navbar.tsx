"use client";

import Link from "next/link";
import Image from "next/image";
import genixLogo from "../../public/genix-logo.png"


export default function Navbar() {
    return (
        <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
            <Link href="/" className="text-xl font-bold">
                <Image src={genixLogo} width={70} height={70} alt="logo" />
            </Link>
            <div className="absolute">
                <Link href="/"><span className="relative left-[80px] font-bold text-[20px]">Work GeniX</span></Link>

            </div>

            <div className="space-x-4">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/add-student">Add Student</Link>
                <Link href="/dashboard/students">Students</Link>
            </div>
        </div>
    );
}