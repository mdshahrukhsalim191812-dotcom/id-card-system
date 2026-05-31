"use client";

import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

import {
    Users,
    CreditCard,
    Clock3,
    ArrowRight,
    PlusCircle,
    LayoutDashboard,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {

    const [loadingPage, setLoadingPage] = useState(true);
    const [totalStudents, setTotalStudents] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingPage(false);
        }, 1000); // Simulate a 2-second loading time

        return () => clearTimeout(timer);
    })

    useEffect(() => {

        const fetchStudents = async () => {

            try {

                const res = await fetch("/api/students");

                const data = await res.json();

                // Save total students count
                setTotalStudents(data.data?.length || 0);

            } catch (error) {

                console.log("Failed to fetch students", error);

            }

        };

        fetchStudents();

    }, []);

    const stats = [
        {
            title: "Total Students",
            value: totalStudents,
            icon: <Users size={30} />,
            color: "from-blue-600 to-cyan-500",
            bg: "bg-blue-50",
            text: "text-blue-600",
        },
        {
            title: "ID Cards Created",
            value: "95",
            icon: <CreditCard size={30} />,
            color: "from-green-600 to-emerald-500",
            bg: "bg-green-50",
            text: "text-green-600",
        },
        {
            title: "Pending Orders",
            value: "25",
            icon: <Clock3 size={30} />,
            color: "from-orange-500 to-yellow-400",
            bg: "bg-orange-50",
            text: "text-orange-500",
        },
    ];

    if (loadingPage) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-[#021B33] via-[#04284B] to-[#063B6E] flex items-center justify-center overflow-hidden z-[999] scroll-none">

                {/* Glow */}
                <div className="absolute w-[350px] h-[350px] bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">

                    {/* Logo Circle */}
                    <div className="relative">

                        <div className="absolute inset-0 rounded-full bg-blue-400 blur-2xl opacity-40 animate-pulse"></div>

                        <div className="relative w-28 h-28 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl">

                            <LayoutDashboard
                                size={50}
                                className="text-white animate-pulse"
                            />

                        </div>

                    </div>

                    {/* Loading Dots */}
                    <div className="mt-10 flex gap-3">

                        <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>

                        <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:0.2s]"></div>

                        <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:0.4s]"></div>

                    </div>

                    {/* Text */}
                    <h2 className="mt-8 text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
                        Loading Dashboard
                    </h2>

                    <p className="mt-3 text-blue-100 text-center text-sm sm:text-base max-w-md leading-relaxed">
                        Please wait while we prepare your dashborad.
                    </p>

                </div>

            </div>
        );
    }

    return (

        <div
            className="
            min-h-screen

            mt-[80px]

            bg-gradient-to-br
            from-[#F4F7FB]
            via-[#EEF4FF]
            to-[#F8FBFF]

            overflow-x-hidden
        "
        >

            {/* ================= HEADER ================= */}
            <div
                className="
                relative

                overflow-hidden

                bg-gradient-to-r
                from-[#021B33]
                via-[#04284B]
                to-[#063B6E]

                text-white
            "
            >

                {/* Glow */}
                <div
                    className="
                    absolute
                    -top-32
                    -left-32

                    w-[400px]
                    h-[400px]

                    bg-cyan-400/10

                    blur-[120px]

                    rounded-full
                "
                ></div>

                <div
                    className="
                    absolute
                    -bottom-32
                    -right-32

                    w-[400px]
                    h-[400px]

                    bg-blue-500/10

                    blur-[120px]

                    rounded-full
                "
                ></div>

                {/* Grid */}
                <div
                    className="
                    absolute inset-0

                    opacity-[0.04]

                    [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]

                    [background-size:60px_60px]
                "
                ></div>

                <div
                    className="
                    relative z-10

                    max-w-7xl
                    mx-auto

                    px-4
                    sm:px-6
                    lg:px-8

                    py-8
                    sm:py-10
                "
                >

                    <div
                        className="
                        flex flex-col
                        xl:flex-row

                        xl:items-center
                        xl:justify-between

                        gap-6
                    "
                    >

                        {/* ================= LEFT ================= */}
                        <div className="flex items-start gap-4">

                            <div
                                className="
                                w-14 h-14
                                sm:w-16 sm:h-16

                                rounded-3xl

                                bg-white/10
                                backdrop-blur-2xl

                                border border-white/10

                                flex items-center justify-center

                                shadow-[0_10px_40px_rgba(0,0,0,0.35)]

                                shrink-0
                            "
                            >

                                <LayoutDashboard size={34} />

                            </div>

                            <div>

                                <h1
                                    className="
                                    text-3xl
                                    sm:text-4xl
                                    lg:text-5xl

                                    font-extrabold

                                    tracking-tight
                                "
                                >
                                    Dashboard
                                </h1>

                                <p
                                    className="
                                    mt-3

                                    text-blue-100

                                    text-sm
                                    sm:text-base

                                    max-w-2xl

                                    leading-relaxed
                                "
                                >
                                    Welcome back! Manage students,
                                    generate professional ID cards
                                    and monitor printing services
                                    from one dashboard.
                                </p>

                            </div>

                        </div>

                        {/* ================= RIGHT BUTTONS ================= */}
                        <div
                            className="
                            flex flex-col
                            sm:flex-row

                            gap-3

                            w-full
                            xl:w-auto
                        "
                        >

                            {/* Students */}
                            <Link
                                href="/dashboard/students"
                                className="
                                group

                                flex items-center
                                justify-center
                                gap-2

                                bg-white

                                text-[#021B33]

                                hover:bg-blue-50

                                font-semibold

                                px-5 py-3

                                rounded-2xl

                                shadow-xl

                                transition-all duration-300

                                hover:scale-[1.02]

                                w-full sm:w-auto
                            "
                            >

                                <Users size={18} />

                                Students

                                <ArrowRight
                                    size={18}
                                    className="
                                    group-hover:translate-x-1
                                    transition
                                "
                                />

                            </Link>

                            {/* Create ID */}
                            <Link
                                href="/dashboard/create-id"
                                className="
                                group

                                flex items-center
                                justify-center
                                gap-2

                                bg-gradient-to-r
                                from-green-500
                                to-green-700

                                hover:scale-[1.02]

                                text-white

                                font-semibold

                                px-5 py-3

                                rounded-2xl

                                shadow-[0_10px_40px_rgba(34,211,238,0.35)]

                                transition-all duration-300

                                w-full sm:w-auto
                            "
                            >

                                <PlusCircle size={20} />

                                Create ID Card

                            </Link>

                            {/* Logout */}
                            <div className="w-full sm:w-auto">
                                <LogoutButton />
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div
                className="
                max-w-7xl
                mx-auto

                px-4
                sm:px-6
                lg:px-8

                py-8
                sm:py-10
            "
            >

                {/* ================= STATS ================= */}
                <div
                    className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-3

                    gap-5
                    lg:gap-6
                "
                >

                    {stats.map((item, index) => (

                        <div
                            key={index}
                            className="
                            relative

                            overflow-hidden

                            rounded-3xl

                            bg-white/80
                            backdrop-blur-2xl

                            border border-white

                            p-5
                            sm:p-6

                            shadow-[0_10px_40px_rgba(0,0,0,0.08)]

                            hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]

                            hover:-translate-y-1

                            transition-all duration-500
                        "
                        >

                            {/* Glow */}
                            <div
                                className={`
                                absolute
                                -top-10
                                -right-10

                                w-40
                                h-40

                                rounded-full

                                bg-gradient-to-br ${item.color}

                                opacity-10

                                blur-2xl
                            `}
                            />

                            <div
                                className="
                                relative z-10

                                flex items-center
                                justify-between
                            "
                            >

                                <div>

                                    <p
                                        className="
                                        text-gray-500

                                        text-sm
                                        sm:text-base

                                        font-medium
                                    "
                                    >
                                        {item.title}
                                    </p>

                                    <h2
                                        className="
                                        text-3xl
                                        sm:text-4xl

                                        font-extrabold

                                        mt-2

                                        text-gray-800
                                    "
                                    >
                                        {item.value}
                                    </h2>

                                </div>

                                <div
                                    className={`
                                    w-14 h-14
                                    sm:w-16 sm:h-16

                                    rounded-2xl

                                    flex items-center
                                    justify-center

                                    ${item.bg}
                                    ${item.text}
                                `}
                                >

                                    {item.icon}

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* ================= QUICK ACTIONS ================= */}
                <div className="mt-12 sm:mt-16">

                    <div className="mb-7">

                        <h2
                            className="
                            text-2xl
                            sm:text-3xl

                            font-bold

                            text-gray-800
                        "
                        >
                            Quick Actions
                        </h2>

                        <p
                            className="
                            text-gray-500

                            mt-2

                            text-sm
                            sm:text-base
                        "
                        >
                            Access important tools quickly.
                        </p>

                    </div>

                    <div
                        className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-3

                        gap-6
                    "
                    >

                        {/* Students */}
                        <Link
                            href="/dashboard/students"
                            className="
                            group

                            bg-white/80
                            backdrop-blur-2xl

                            rounded-3xl

                            p-6

                            border border-white

                            shadow-[0_10px_40px_rgba(0,0,0,0.08)]

                            hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]

                            hover:-translate-y-1

                            transition-all duration-500
                        "
                        >

                            <div
                                className="
                                flex items-start
                                justify-between

                                gap-4
                            "
                            >

                                <div>

                                    <h3
                                        className="
                                        text-xl
                                        sm:text-2xl

                                        font-bold

                                        text-gray-800
                                    "
                                    >
                                        Manage Students
                                    </h3>

                                    <p
                                        className="
                                        text-gray-500

                                        mt-3

                                        text-sm

                                        leading-relaxed
                                    "
                                    >
                                        Add, update and manage
                                        all student records easily.
                                    </p>

                                </div>

                                <div
                                    className="
                                    w-14 h-14

                                    rounded-2xl

                                    bg-blue-100

                                    flex items-center justify-center

                                    text-blue-600

                                    shrink-0
                                "
                                >
                                    <Users size={28} />
                                </div>

                            </div>

                            <div
                                className="
                                mt-8

                                flex items-center

                                text-blue-600

                                font-semibold
                            "
                            >

                                Open

                                <ArrowRight
                                    size={18}
                                    className="
                                    ml-2

                                    group-hover:translate-x-1

                                    transition
                                "
                                />

                            </div>

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );
}