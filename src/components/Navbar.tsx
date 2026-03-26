"use client";

import Link from "next/link";
import Image from "next/image";
import genixLogo from "../../public/genix-logo.png"


export default function Navbar() {
    return (
        <div className="flex justify-between items-center px-6 py-[5px] bg-gradient-to-r from-blue-800 via-violet-600 to-blue-950 text-white">
            <Link href="/">
                <Image src={genixLogo} width={60} height={60} alt="logo" />
            </Link>
            <div className="absolute">
                <Link href="/"><span className="relative left-[70px] bottom-[1px] font-bold text-[18px]">Work GeniX</span></Link>

            </div>

            <div className="space-x-[12px]">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/add-student">Add Student</Link>
                <Link href="/dashboard/students">Students</Link>
            </div>
        </div>
    );
}