"use client";

import { useEffect, useState } from "react";

import {
    School,
    Users,
    CreditCard,
    Activity,
    ArrowUpRight,
    LayoutDashboard,
} from "lucide-react";

import {
    BarChart3,
    ShieldCheck,
} from "lucide-react";

type SchoolType = {
    _id: string;
    name: string;
    email: string;
    templateId?: string;
    templateImage?:string;
};

type StudentType = {
    _id: string;
    name: string;
    class: string;

    schoolId?: {
        name: string;
    };
};

export default function AdminDashboard() {

    const [schools, setSchools] = useState<SchoolType[]>([]);
    const [students, setStudents] = useState<StudentType[]>([]);
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const [schoolsRes, studentsRes] = await Promise.all([
                    fetch("/api/admin/schools"),
                    fetch("/api/admin/students"),
                ]);

                const schoolsData = await schoolsRes.json();
                const studentsData = await studentsRes.json();

                setSchools(schoolsData);
                setStudents(studentsData);

            } catch (error) {

                console.log(error);

            } finally {

                setLoadingPage(false);
            }
        };

        fetchData();

    }, []);

    const stats = [
        {
            title: "Total Schools",
            value: schools.length,
            icon: <School size={28} />,
            color: "bg-blue-500 text-blue-600",
        },
        {
            title: "Total Students",
            value: students.length,
            icon: <Users size={28} />,
            color: "bg-green-400 text-green-600",
        },
        {
            title: "ID Cards Generated",
            value: students.length,
            icon: <CreditCard size={28} />,
            color: "bg-orange-400 text-orange-500",
        },
        {
            title: "Active Schools",
            value: schools.length,
            icon: <Activity size={28} />,
            color: "bg-purple-500 text-purple-600",
        },
    ];

    if (loadingPage) {

        return (

            <div className="
                min-h-screen
                bg-gradient-to-br
                from-[#021B33]
                via-[#04284B]
                to-[#063B6E]
                flex items-center justify-center
                overflow-hidden
                z-[999]
            ">

                {/* GLOW */}
                <div className="
                    absolute w-[400px] h-[400px]
                    bg-blue-500/20 blur-3xl
                    rounded-full animate-pulse
                "></div>

                <div className="relative z-10 text-center px-6">

                    {/* ICON */}
                    <div className="
                        w-28 h-28 rounded-full
                        bg-white/10 backdrop-blur-xl
                        border border-white/10
                        flex items-center justify-center
                        mx-auto shadow-2xl
                    ">

                        <LayoutDashboard
                            size={55}
                            className="text-white animate-pulse"
                        />

                    </div>

                    {/* TITLE */}
                    <h2 className="
                        mt-8 text-4xl
                        font-extrabold text-white
                    ">
                        Loading Admin Panel
                    </h2>

                    <p className="
                        text-blue-100 mt-3
                        max-w-md mx-auto
                    ">
                        Preparing school database and
                        student records...
                    </p>

                    {/* LOADER */}
                    <div className="
                        mt-8 flex items-center
                        justify-center gap-2
                    ">

                        <div className="
                            w-3 h-3 rounded-full
                            bg-white animate-bounce
                        "></div>

                        <div className="
                            w-3 h-3 rounded-full
                            bg-white animate-bounce
                            delay-150
                        "></div>

                        <div className="
                            w-3 h-3 rounded-full
                            bg-white animate-bounce
                            delay-300
                        "></div>

                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F7FB] p-4 sm:p-6 lg:p-8">

            {/* ================= HERO HEADER ================= */}
            <div className="
        relative overflow-hidden
        bg-gradient-to-r
        from-[#021B33]
        via-[#04284B]
        to-[#063B6E]
        rounded-[32px]
        p-6 sm:p-8 lg:p-10
        shadow-2xl
        text-white
    ">

                {/* GLOW */}
                <div className="
            absolute top-0 right-0
            w-[300px] h-[300px]
            bg-blue-400/20 blur-3xl
            rounded-full
        "></div>

                <div className="
            relative z-10
            flex flex-col xl:flex-row
            xl:items-center
            xl:justify-between
            gap-8
        ">

                    {/* LEFT */}
                    <div>

                        <div className="
                    inline-flex items-center gap-2
                    bg-white/10
                    border border-white/10
                    backdrop-blur-md
                    px-4 py-2
                    rounded-full
                    text-sm font-medium
                ">

                            <ShieldCheck size={18} />

                            Super Admin Panel

                        </div>

                        <h1 className="
                    mt-5
                    text-4xl sm:text-5xl lg:text-6xl
                    font-extrabold
                    tracking-tight
                    leading-tight
                ">
                            Dashboard Overview
                        </h1>

                        <p className="
                    mt-4
                    text-blue-100
                    max-w-2xl
                    text-sm sm:text-base lg:text-lg
                    leading-relaxed
                ">
                            Monitor all schools, manage students,
                            download professional ID cards and
                            control your entire school ecosystem
                            from one premium dashboard.
                        </p>

                    </div>

                    {/* RIGHT CARD */}
                    <div className="
                bg-white/10
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-6
                min-w-[280px]
                shadow-2xl
            ">

                        <div className="flex items-center gap-4">

                            <div className="
                        w-16 h-16
                        rounded-2xl
                        bg-white/10
                        flex items-center justify-center
                    ">

                                <BarChart3 size={34} />

                            </div>

                            <div>

                                <p className="text-blue-100">
                                    System Status
                                </p>

                                <h2 className="
                            text-3xl font-extrabold
                        ">
                                    Active
                                </h2>

                            </div>

                        </div>

                        <div className="
                    mt-6
                    grid grid-cols-2
                    gap-4
                ">

                            <div className="
                        bg-white/5
                        rounded-2xl
                        p-4
                    ">

                                <p className="text-blue-100 text-sm">
                                    Schools
                                </p>

                                <h3 className="
                            text-2xl font-bold mt-1
                        ">
                                    {schools.length}
                                </h3>

                            </div>

                            <div className="
                        bg-white/5
                        rounded-2xl
                        p-4
                    ">

                                <p className="text-blue-100 text-sm">
                                    Students
                                </p>

                                <h3 className="
                            text-2xl font-bold mt-1
                        ">
                                    {students.length}
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= STATS ================= */}
            <div className="
        grid grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
        mt-8
    ">

                {stats.map((item, index) => (

                    <div
                        key={index}
                        className="
                    relative overflow-hidden
                    bg-white
                    rounded-[28px]
                    p-6
                    shadow-md
                    border border-gray-100
                    hover:shadow-2xl
                    hover:-translate-y-1
                    transition-all duration-300
                "
                    >

                        {/* BG GRADIENT */}
                        <div className={`
                    absolute -top-10 -right-10
                    w-32 h-32 rounded-full
                    opacity-10 blur-2xl
                    ${item.color}
                `}></div>

                        <div className="
                    relative z-10
                    flex items-start justify-between
                ">

                            <div>

                                <p className="
                            text-gray-500
                            text-sm font-medium
                        ">
                                    {item.title}
                                </p>

                                <h2 className="
                            text-4xl
                            font-extrabold
                            mt-3
                            text-gray-800
                        ">
                                    {item.value}
                                </h2>

                            </div>

                            <div className={`
                        w-16 h-16 rounded-2xl
                        flex items-center justify-center
                        shadow-lg text-white
                        bg-gradient-to-br
                        ${item.color}
                    `}>

                                {item.icon}

                            </div>

                        </div>

                        {/* FOOTER */}
                        <div className="
                    mt-6
                    flex items-center
                    text-emerald-600
                    text-sm font-semibold
                ">

                            <ArrowUpRight size={16} />

                            <span className="ml-2">
                                Real-time active data
                            </span>

                        </div>

                    </div>

                ))}

            </div>

            {/* ================= MAIN GRID ================= */}
            <div className="
        grid grid-cols-1
        2xl:grid-cols-3
        gap-6
        mt-8
    ">

                {/* ================= RECENT SCHOOLS ================= */}
                <div className="
    bg-gradient-to-br from-blue-400 to-blue-900
    rounded-[28px] sm:rounded-[32px]
    p-4 sm:p-6 lg:p-7
    shadow-md
    border border-gray-100
    hover:shadow-xl
    transition-all duration-300
">

                    {/* ================= HEADER ================= */}
                    <div className="
        flex flex-col sm:flex-row
        sm:items-center
        sm:justify-between
        gap-4
        mb-6
    ">

                        {/* LEFT */}
                        <div>

                            <h2 className="
                text-xl sm:text-2xl lg:text-3xl
                font-extrabold
                text-gray-800
                tracking-tight
            ">
                                Recent Schools
                            </h2>

                            <p className="
                text-gray-500
                text-sm sm:text-base
                mt-1
            ">
                                Latest registered schools
                            </p>

                        </div>

                        {/* COUNT BADGE */}
                        <div className="
            w-fit
            px-4 py-2.5
            rounded-2xl
            bg-gradient-to-r
            from-blue-50
            to-cyan-50
            border border-blue-100
            text-blue-600
            font-bold
            text-sm sm:text-base
            shadow-sm
        ">

                            {schools.length} Schools

                        </div>

                    </div>

                    {/* ================= LIST ================= */}
                    <div className="
        grid grid-cols-1
        md:grid-cols-2
        xl:grid-cols-1
        gap-4
    ">

                        {schools.slice(0, 5).map((school) => (

                            <div
                                key={school._id}
                                className="
                    group
                    relative
                    overflow-hidden
                    flex items-center
                    justify-between
                    gap-4
                    p-4 sm:p-5
                    rounded-3xl
                    border border-gray-100
                    bg-gradient-to-r
                    from-white
                    to-[#F8FBFF]
                    hover:border-blue-100
                    hover:shadow-lg
                    hover:-translate-y-1
                    transition-all duration-300
                "
                            >

                                {/* BG GLOW */}
                                <div className="
                    absolute -right-10 -top-10
                    w-28 h-28
                    bg-blue-500/5
                    rounded-full
                    blur-2xl
                "></div>

                                {/* LEFT CONTENT */}
                                <div className="
                    relative z-10
                    flex items-center
                    gap-4
                    min-w-0
                    flex-1
                ">

                                    {/* AVATAR */}
                                    <div className="
                        w-14 h-14 sm:w-16 sm:h-16
                        rounded-2xl
                        bg-gradient-to-br
                        from-blue-500
                        to-cyan-500
                        text-white
                        flex items-center justify-center
                        font-bold
                        text-lg sm:text-xl
                        shadow-lg
                        shrink-0
                        group-hover:scale-105
                        transition
                    ">

                                        {school.name.charAt(0)}

                                    </div>

                                    {/* TEXT */}
                                    <div className="min-w-0 flex-1">

                                        <h3 className="
                            font-bold
                            text-gray-800
                            text-base sm:text-lg
                            truncate
                        ">
                                            {school.name}
                                        </h3>

                                        <p className="
                            text-sm sm:text-base
                            text-gray-500
                            break-all sm:truncate
                            mt-1
                        ">
                                            {school.email}
                                        </p>

                                        {/* MOBILE TEMPLATE */}
                                        <div className="
                            mt-3
                            sm:hidden
                        ">

                                            <span className="
                                inline-flex items-center
                                px-3 py-1.5
                                rounded-xl
                                bg-green-50
                                text-green-600
                                text-xs font-semibold
                            ">

                                                {school.templateId || "No Template"}

                                            </span>

                                        </div>

                                    </div>

                                </div>

                                {/* RIGHT SIDE */}
                                <div className="
                    relative z-10
                    flex flex-col
                    items-end
                    gap-3
                    shrink-0
                ">

                                    {/* ICON */}
                                    <div className="
                        w-11 h-11 sm:w-12 sm:h-12
                        rounded-2xl
                        bg-blue-50
                        text-blue-600
                        flex items-center justify-center
                        shadow-sm
                        group-hover:bg-blue-100
                        transition
                    ">

                                        <School size={20} />

                                    </div>

                                    {/* TEMPLATE */}
                                    <div className="hidden sm:block">

                                        <span className="
                            inline-flex items-center
                            px-3 py-2
                            rounded-xl
                            bg-green-50
                            text-green-600
                            text-xs sm:text-sm
                            font-semibold
                            whitespace-nowrap
                        ">

                                            {school.templateId || "No Template"}

                                        </span>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* ================= EMPTY ================= */}
                    {schools.length === 0 && (

                        <div className="
            py-14
            text-center
        ">

                            <div className="
                w-20 h-20
                rounded-full
                bg-gray-100
                text-gray-400
                flex items-center justify-center
                mx-auto
            ">

                                <School size={36} />

                            </div>

                            <h3 className="
                mt-5
                text-2xl
                font-bold
                text-gray-700
            ">
                                No Schools Found
                            </h3>

                            <p className="
                text-gray-500
                mt-2
                max-w-md
                mx-auto
            ">
                                Schools will appear here after registration.
                            </p>

                        </div>

                    )}

                </div>

                {/* ================= RECENT STUDENTS ================= */}
                <div className="
    2xl:col-span-2
    bg-gradient-to-br from-gray-200 to-gray-300
    rounded-[28px] sm:rounded-[32px]
    p-4 sm:p-6 lg:p-7
    shadow-md
    border border-gray-100
    hover:shadow-2xl
    transition-all duration-300
">

                    {/* ================= HEADER ================= */}
                    <div className="
        flex flex-col lg:flex-row
        lg:items-center
        lg:justify-between
        gap-5
        mb-7
    ">

                        {/* LEFT */}
                        <div>

                            <h2 className="
                text-2xl sm:text-3xl
                font-extrabold
                text-gray-800
                tracking-tight
            ">
                                Recent Students
                            </h2>

                            <p className="
                text-gray-500
                text-sm sm:text-base
                mt-1.5
            ">
                                Latest student activity and records
                            </p>

                        </div>

                        {/* RIGHT BADGE */}
                        <div className="
            w-fit
            px-5 py-3
            rounded-2xl
            bg-gradient-to-r
            from-green-50
            to-emerald-50
            border border-green-100
            text-green-600
            font-bold
            text-sm sm:text-base
            shadow-sm
        ">

                            {students.length} Students

                        </div>

                    </div>

                    {/* ================= DESKTOP TABLE ================= */}
                    <div className="
        hidden xl:block
        overflow-hidden
        rounded-3xl
        border border-gray-100
    ">

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[850px]">

                                <thead className="
                    bg-gradient-to-r
                    from-[#F8FAFC]
                    to-[#EEF4FF]
                ">

                                    <tr>

                                        <th className="
                            px-6 py-5
                            text-left
                            text-sm font-bold
                            uppercase tracking-wide
                            text-gray-500
                        ">
                                            Student
                                        </th>

                                        <th className="
                            px-6 py-5
                            text-left
                            text-sm font-bold
                            uppercase tracking-wide
                            text-gray-500
                        ">
                                            Class
                                        </th>

                                        <th className="
                            px-6 py-5
                            text-left
                            text-sm font-bold
                            uppercase tracking-wide
                            text-gray-500
                        ">
                                            School
                                        </th>

                                        <th className="
                            px-6 py-5
                            text-left
                            text-sm font-bold
                            uppercase tracking-wide
                            text-gray-500
                        ">
                                            Status
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {students.slice(0, 8).map((student, index) => (

                                        <tr
                                            key={student._id}
                                            className="
                                border-t border-gray-100
                                hover:bg-[#F8FBFF]
                                transition-all duration-300
                            "
                                        >

                                            {/* STUDENT */}
                                            <td className="px-6 py-5">

                                                <div className="
                                    flex items-center gap-4
                                ">

                                                    {/* AVATAR */}
                                                    <div className="
                                        w-14 h-14
                                        rounded-2xl
                                        bg-gradient-to-br
                                        from-indigo-500
                                        to-violet-600
                                        text-white
                                        flex items-center justify-center
                                        font-bold text-lg
                                        shadow-md
                                        shrink-0
                                    ">

                                                        {student.name.charAt(0)}

                                                    </div>

                                                    {/* TEXT */}
                                                    <div className="min-w-0">

                                                        <h3 className="
                                            font-bold
                                            text-gray-800
                                            truncate
                                        ">
                                                            {student.name}
                                                        </h3>

                                                        <p className="
                                            text-sm
                                            text-gray-500
                                        ">
                                                            Student Record
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* CLASS */}
                                            <td className="px-6 py-5">

                                                <span className="
                                    inline-flex items-center
                                    px-4 py-2
                                    rounded-2xl
                                    bg-blue-50
                                    text-blue-600
                                    text-sm font-bold
                                    border border-blue-100
                                ">

                                                    Class {student.class}

                                                </span>

                                            </td>

                                            {/* SCHOOL */}
                                            <td className="px-6 py-5">

                                                <div className="
                                    flex items-center gap-3
                                ">

                                                    <div className="
                                        w-10 h-10
                                        rounded-xl
                                        bg-violet-50
                                        text-violet-600
                                        flex items-center justify-center
                                    ">

                                                        <School size={18} />

                                                    </div>

                                                    <span className="
                                        font-semibold
                                        text-gray-700
                                    ">
                                                        {student.schoolId?.name}
                                                    </span>

                                                </div>

                                            </td>

                                            {/* STATUS */}
                                            <td className="px-6 py-5">

                                                <span className="
                                    inline-flex items-center gap-2
                                    px-4 py-2
                                    rounded-2xl
                                    bg-green-50
                                    text-green-600
                                    text-sm font-bold
                                    border border-green-100
                                ">

                                                    <span className="
                                        w-2.5 h-2.5
                                        rounded-full
                                        bg-green-500
                                    "></span>

                                                    Active

                                                </span>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* ================= TABLET + MOBILE ================= */}
                    <div className="
        grid grid-cols-1
        md:grid-cols-2
        gap-5
        xl:hidden
    ">

                        {students.slice(0, 8).map((student) => (

                            <div
                                key={student._id}
                                className="
                    group
                    relative
                    overflow-hidden
                    bg-gradient-to-br
                    from-white
                    to-[#F8FBFF]
                    border border-gray-100
                    rounded-[28px]
                    p-5
                    shadow-sm
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all duration-300
                "
                            >

                                {/* BG GLOW */}
                                <div className="
                    absolute -top-10 -right-10
                    w-28 h-28
                    rounded-full
                    bg-violet-500/5
                    blur-2xl
                "></div>

                                {/* TOP */}
                                <div className="
                    relative z-10
                    flex items-start
                    justify-between
                    gap-4
                ">

                                    <div className="
                        flex items-center gap-4
                        min-w-0 flex-1
                    ">

                                        {/* AVATAR */}
                                        <div className="
                            w-16 h-16
                            rounded-2xl
                            bg-gradient-to-br
                            from-indigo-500
                            to-violet-600
                            text-white
                            flex items-center justify-center
                            font-bold text-xl
                            shadow-md
                            shrink-0
                        ">

                                            {student.name.charAt(0)}

                                        </div>

                                        {/* TEXT */}
                                        <div className="min-w-0 flex-1">

                                            <h3 className="
                                font-bold
                                text-gray-800
                                text-lg
                                truncate
                            ">
                                                {student.name}
                                            </h3>

                                            <p className="
                                text-sm
                                text-gray-500
                                mt-1
                            ">
                                                Student Record
                                            </p>

                                        </div>

                                    </div>

                                    {/* ICON */}
                                    <div className="
                        w-11 h-11
                        rounded-2xl
                        bg-violet-50
                        text-violet-600
                        flex items-center justify-center
                        shrink-0
                    ">

                                        <Users size={20} />

                                    </div>

                                </div>

                                {/* DETAILS */}
                                <div className="
                    relative z-10
                    mt-6
                    grid grid-cols-2
                    gap-4
                ">

                                    {/* CLASS */}
                                    <div className="
                        bg-blue-50
                        rounded-2xl
                        p-4
                        border border-blue-100
                    ">

                                        <p className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-blue-500
                        ">
                                            Class
                                        </p>

                                        <h4 className="
                            mt-2
                            font-bold
                            text-gray-800
                            text-lg
                        ">
                                            {student.class}
                                        </h4>

                                    </div>

                                    {/* STATUS */}
                                    <div className="
                        bg-green-50
                        rounded-2xl
                        p-4
                        border border-green-100
                    ">

                                        <p className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-green-500
                        ">
                                            Status
                                        </p>

                                        <h4 className="
                            mt-2
                            font-bold
                            text-green-600
                            text-lg
                        ">
                                            Active
                                        </h4>

                                    </div>

                                </div>

                                {/* SCHOOL */}
                                <div className="
                    relative z-10
                    mt-5
                    flex items-center gap-3
                    p-4
                    rounded-2xl
                    bg-gray-50
                    border border-gray-100
                ">

                                    <div className="
                        w-11 h-11
                        rounded-xl
                        bg-white
                        border border-gray-100
                        text-violet-600
                        flex items-center justify-center
                        shadow-sm
                        shrink-0
                    ">

                                        <School size={18} />

                                    </div>

                                    <div className="min-w-0">

                                        <p className="
                            text-xs
                            uppercase
                            tracking-wide
                            text-gray-400
                            font-semibold
                        ">
                                            School
                                        </p>

                                        <h4 className="
                            font-bold
                            text-gray-800
                            truncate
                        ">
                                            {student.schoolId?.name}
                                        </h4>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* ================= EMPTY ================= */}
                    {students.length === 0 && (

                        <div className="
            py-16
            text-center
        ">

                            <div className="
                w-20 h-20
                rounded-full
                bg-gray-100
                flex items-center justify-center
                mx-auto
                text-gray-400
            ">

                                <Users size={36} />

                            </div>

                            <h3 className="
                mt-5
                text-2xl
                font-bold
                text-gray-700
            ">
                                No Students Found
                            </h3>

                            <p className="
                mt-2
                text-gray-500
            ">
                                Recent student records will appear here.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}