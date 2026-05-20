"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
    School,
    Search,
    Trash2,
    ArrowUpRight,
} from "lucide-react";

type SchoolType = {
    _id: string;
    name: string;
    email: string;
    templateId?: string;
};

export default function AdminSchoolsPage() {

    const [schools, setSchools] = useState<SchoolType[]>([]);
    const [filteredSchools, setFilteredSchools] = useState<SchoolType[]>([]);
    const [search, setSearch] = useState("");
    const [loadingPage, setLoadingPage] = useState(true);

    // ================= FETCH =================
    useEffect(() => {

        const fetchSchools = async () => {

            try {

                const res = await fetch("/api/admin/schools");

                const data = await res.json();

                setSchools(data);
                setFilteredSchools(data);

            } catch (error) {

                console.log(error);

                toast.error("Failed to load schools");

            } finally {

                setLoadingPage(false);
            }
        };

        fetchSchools();

    }, []);

    // ================= SEARCH =================
    useEffect(() => {

        const filtered = schools.filter((school) =>
            school.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            school.email
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        setFilteredSchools(filtered);

    }, [search, schools]);

    // ================= DELETE =================
    const handleDelete = async (
        id: string,
        schoolName: string
    ) => {

        toast((t) => (

            <div className="flex flex-col gap-4">

                <div>

                    <h2 className="font-bold text-gray-800 text-lg">
                        Delete School?
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {schoolName} and all students will be permanently deleted.
                    </p>

                </div>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="
                            px-4 py-2 rounded-xl
                            bg-gray-100 hover:bg-gray-200
                            text-gray-700 font-medium
                            transition
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={async () => {

                            toast.dismiss(t.id);

                            const loadingToast = toast.loading(
                                "Deleting school..."
                            );

                            try {

                                const res = await fetch(
                                    `/api/admin/schools/${id}`,
                                    {
                                        method: "DELETE",
                                    }
                                );

                                const data = await res.json();

                                toast.dismiss(loadingToast);

                                if (data.success) {

                                    setSchools((prev) =>
                                        prev.filter(
                                            (school) =>
                                                school._id !== id
                                        )
                                    );

                                    toast.success(
                                        "School deleted successfully"
                                    );

                                } else {

                                    toast.error(
                                        data.message ||
                                        "Delete failed"
                                    );
                                }

                            } catch (error) {

                                console.log(error);

                                toast.dismiss(loadingToast);

                                toast.error(
                                    "Something went wrong"
                                );
                            }

                        }}
                        className="
                            px-4 py-2 rounded-xl
                            bg-red-500 hover:bg-red-600
                            text-white font-semibold
                            transition
                        "
                    >
                        Delete
                    </button>

                </div>

            </div>

        ));
    };

    // ================= LOADING =================
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

                        <School
                            size={55}
                            className="text-white animate-pulse"
                        />

                    </div>

                    {/* TITLE */}
                    <h2 className="
                        mt-8 text-4xl
                        font-extrabold text-white
                    ">
                        Loading School Panel
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
            <div
                className="
            relative overflow-hidden
            rounded-[28px] sm:rounded-[32px] lg:rounded-[40px]
            bg-gradient-to-r
            from-[#021B33]
            via-[#04284B]
            to-[#063B6E]
            p-5 sm:p-8 lg:p-10 xl:p-12
            shadow-[0_20px_80px_rgba(2,27,51,0.25)]
        "
            >

                {/* BG EFFECTS */}
                <div className="
            absolute -top-24 -right-24
            w-[320px] h-[320px]
            bg-cyan-400/10
            blur-3xl rounded-full
        "></div>

                <div className="
            absolute bottom-0 left-0
            w-[260px] h-[260px]
            bg-blue-500/10
            blur-3xl rounded-full
        "></div>

                {/* CONTENT */}
                <div className="
            relative z-10
            flex flex-col
            2xl:flex-row
            2xl:items-center
            2xl:justify-between
            gap-8
        ">

                    {/* LEFT */}
                    <div className="max-w-3xl">

                        {/* BADGE */}
                        <div className="
                    inline-flex items-center gap-2
                    px-4 py-2.5
                    rounded-full
                    bg-white/10
                    backdrop-blur-xl
                    border border-white/10
                    text-white
                    text-sm font-medium
                    shadow-lg
                ">

                            <School size={18} />

                            School Administration

                        </div>

                        {/* TITLE */}
                        <h1 className="
                    mt-5
                    text-3xl sm:text-5xl lg:text-6xl
                    font-extrabold
                    tracking-tight
                    leading-[1.1]
                    text-white
                ">
                            Schools
                            <span className="text-cyan-300"> Management</span>
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="
                    mt-5
                    text-blue-100
                    text-sm sm:text-base lg:text-lg
                    leading-relaxed
                    max-w-2xl
                ">
                            Manage all registered schools, templates,
                            permissions and records professionally from
                            one premium super admin dashboard.
                        </p>

                    </div>

                    {/* RIGHT PREMIUM CARD */}
                    <div className="
                w-full sm:w-auto
                bg-white/10
                backdrop-blur-2xl
                border border-white/10
                rounded-[28px]
                p-5 sm:p-6
                shadow-2xl
            ">

                        <div className="
                    flex items-center gap-5
                ">

                            {/* ICON */}
                            <div className="
                        w-16 h-16 sm:w-20 sm:h-20
                        rounded-3xl
                        bg-white/10
                        flex items-center justify-center
                        text-white
                        shadow-lg
                        shrink-0
                    ">

                                <School size={38} />

                            </div>

                            {/* TEXT */}
                            <div>

                                <p className="
                            text-blue-200
                            text-sm sm:text-base
                        ">
                                    Total Schools
                                </p>

                                <h2 className="
                            text-4xl sm:text-5xl
                            font-extrabold
                            text-white
                            mt-1
                        ">
                                    {schools.length}
                                </h2>

                            </div>

                        </div>

                        {/* STATUS */}
                        <div className="
                    mt-6
                    flex items-center gap-2
                    text-green-300
                    font-semibold
                    text-sm sm:text-base
                ">

                            <ArrowUpRight size={18} />

                            System Running Smoothly

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= TOP SECTION ================= */}
            <div className="
        grid grid-cols-1
        xl:grid-cols-3
        gap-6
        mt-8
    ">

                {/* STATS CARD */}
                <div className="
            relative overflow-hidden
            bg-white
            rounded-[28px] sm:rounded-[32px]
            p-6
            border border-gray-100
            shadow-md
            hover:shadow-2xl
            transition-all duration-300
        ">

                    {/* BG */}
                    <div className="
                absolute -top-10 -right-10
                w-32 h-32
                rounded-full
                bg-blue-500/10
                blur-2xl
            "></div>

                    <div className="
                relative z-10
                flex items-center justify-between
            ">

                        <div>

                            <p className="
                        text-gray-500
                        text-sm font-medium
                    ">
                                Registered Schools
                            </p>

                            <h2 className="
                        mt-3
                        text-4xl sm:text-5xl
                        font-extrabold
                        text-blue-600
                    ">
                                {schools.length}
                            </h2>

                        </div>

                        <div className="
                    w-16 h-16
                    rounded-3xl
                    bg-gradient-to-br
                    from-blue-500
                    to-cyan-500
                    text-white
                    flex items-center justify-center
                    shadow-xl
                ">

                            <School size={30} />

                        </div>

                    </div>

                </div>

                {/* SEARCH */}
                <div className="
            xl:col-span-2
            bg-white
            rounded-[28px] sm:rounded-[32px]
            p-5 sm:p-6
            shadow-md
            border border-gray-100
            flex items-center
        ">

                    <div className="relative w-full">

                        <Search
                            size={20}
                            className="
                        absolute left-5
                        top-1/2 -translate-y-1/2
                        text-gray-400
                    "
                        />

                        <input
                            type="text"
                            placeholder="Search schools by name or email..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="
                        w-full
                        pl-14 pr-5 py-4
                        rounded-2xl
                        border border-gray-200
                        bg-[#F8FAFC]
                        focus:bg-white
                        focus:ring-2
                        focus:ring-blue-500
                        outline-none
                        transition-all duration-300
                        text-gray-700
                        placeholder:text-gray-400
                    "
                        />

                    </div>

                </div>

            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="
        hidden xl:block
        mt-8
        bg-white
        rounded-[32px]
        shadow-md
        border border-gray-100
        overflow-hidden
    ">

                {/* TABLE HEADER */}
                <div className="
            px-8 py-6
            border-b border-gray-100
            flex items-center justify-between
            bg-gradient-to-r
            from-white
            to-[#F8FBFF]
        ">

                    <div>

                        <h2 className="
                    text-2xl font-bold
                    text-gray-800
                ">
                            Schools Database
                        </h2>

                        <p className="
                    text-gray-500
                    text-sm mt-1
                ">
                            Manage and monitor all schools professionally.
                        </p>

                    </div>

                    <div className="
                px-5 py-2.5
                rounded-2xl
                bg-blue-50
                text-blue-600
                font-bold text-sm
                border border-blue-100
            ">

                        {filteredSchools.length} Results

                    </div>

                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-[#F8FAFC]">

                            <tr>

                                <th className="
                            px-8 py-5
                            text-left
                            font-bold text-gray-600
                        ">
                                    School
                                </th>

                                <th className="
                            px-8 py-5
                            text-left
                            font-bold text-gray-600
                        ">
                                    Email
                                </th>

                                <th className="
                            px-8 py-5
                            text-left
                            font-bold text-gray-600
                        ">
                                    Template
                                </th>

                                <th className="
                            px-8 py-5
                            text-center
                            font-bold text-gray-600
                        ">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredSchools.map((school) => (

                                <tr
                                    key={school._id}
                                    className="
                                border-t border-gray-100
                                hover:bg-[#F8FBFF]
                                transition-all duration-300
                            "
                                >

                                    {/* SCHOOL */}
                                    <td className="px-8 py-6">

                                        <div className="
                                    flex items-center gap-4
                                ">

                                            <div className="
                                        w-14 h-14
                                        rounded-3xl
                                        bg-gradient-to-br
                                        from-blue-500
                                        to-cyan-500
                                        text-white
                                        flex items-center justify-center
                                        font-bold text-lg
                                        shadow-lg
                                    ">

                                                {school.name.charAt(0)}

                                            </div>

                                            <div>

                                                <h3 className="
                                            font-bold
                                            text-gray-800
                                            text-lg
                                        ">
                                                    {school.name}
                                                </h3>

                                                <p className="
                                            text-sm text-gray-500
                                        ">
                                                    Registered School
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    {/* EMAIL */}
                                    <td className="
                                px-8 py-6
                                text-gray-700
                                font-medium
                            ">
                                        {school.email}
                                    </td>

                                    {/* TEMPLATE */}
                                    <td className="px-8 py-6">

                                        <span className="
                                    inline-flex items-center
                                    px-4 py-2
                                    rounded-2xl
                                    bg-green-50
                                    text-green-600
                                    text-sm font-semibold
                                    border border-green-100
                                ">

                                            {school.templateId || "No Template"}

                                        </span>

                                    </td>

                                    {/* ACTION */}
                                    <td className="
                                px-8 py-6
                                text-center
                            ">

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    school._id,
                                                    school.name
                                                )
                                            }
                                            className="
                                        inline-flex items-center gap-2
                                        bg-red-500 hover:bg-red-600
                                        text-white
                                        px-5 py-3
                                        rounded-2xl
                                        font-semibold
                                        shadow-lg
                                        transition-all duration-300
                                        hover:scale-105
                                    "
                                        >

                                            <Trash2 size={18} />

                                            Delete School

                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* ================= MOBILE + TABLET ================= */}
            <div className="
        xl:hidden
        mt-8
        grid grid-cols-1
        md:grid-cols-2
        gap-5
    ">

                {filteredSchools.map((school) => (

                    <div
                        key={school._id}
                        className="
                    relative overflow-hidden
                    bg-white
                    rounded-[28px]
                    p-5
                    shadow-md
                    border border-gray-100
                    hover:shadow-2xl
                    transition-all duration-300
                "
                    >

                        {/* BG */}
                        <div className="
                    absolute -top-10 -right-10
                    w-28 h-28
                    rounded-full
                    bg-blue-500/5
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
                        min-w-0
                    ">

                                <div className="
                            w-14 h-14
                            rounded-3xl
                            bg-gradient-to-br
                            from-blue-500
                            to-cyan-500
                            text-white
                            flex items-center justify-center
                            font-bold text-lg
                            shadow-lg
                            shrink-0
                        ">

                                    {school.name.charAt(0)}

                                </div>

                                <div className="min-w-0">

                                    <h2 className="
                                text-lg font-bold
                                text-gray-800
                                truncate
                            ">
                                        {school.name}
                                    </h2>

                                    <p className="
                                text-sm text-gray-500
                                break-all mt-1
                            ">
                                        {school.email}
                                    </p>

                                </div>

                            </div>

                            <div className="
                        w-12 h-12
                        rounded-2xl
                        bg-blue-50
                        text-blue-600
                        flex items-center justify-center
                        shrink-0
                    ">

                                <School size={22} />

                            </div>

                        </div>

                        {/* TEMPLATE */}
                        <div className="
                    relative z-10
                    mt-6
                    flex items-center
                    justify-between
                    gap-4
                    p-4
                    rounded-2xl
                    bg-[#F8FAFC]
                    border border-gray-100
                ">

                            <span className="
                        text-gray-500
                        text-sm font-medium
                    ">
                                Template
                            </span>

                            <span className="
                        px-4 py-2
                        rounded-xl
                        bg-green-50
                        text-green-600
                        text-sm font-semibold
                        border border-green-100
                        text-right
                    ">

                                {school.templateId || "No Template"}

                            </span>

                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={() =>
                                handleDelete(
                                    school._id,
                                    school.name
                                )
                            }
                            className="
                        relative z-10
                        mt-6
                        w-full
                        flex items-center justify-center gap-2
                        bg-red-500 hover:bg-red-600
                        text-white
                        py-3.5 rounded-2xl
                        font-semibold
                        shadow-lg
                        transition-all duration-300
                        active:scale-[0.98]
                    "
                        >

                            <Trash2 size={18} />

                            Delete School

                        </button>

                    </div>

                ))}

            </div>

            {/* ================= EMPTY ================= */}
            {filteredSchools.length === 0 && (

                <div className="
            mt-8
            bg-white
            rounded-[32px]
            p-10 sm:p-14
            text-center
            shadow-md
            border border-gray-100
        ">

                    <div className="
                w-24 h-24
                rounded-full
                bg-gray-100
                text-gray-400
                flex items-center justify-center
                mx-auto
            ">

                        <School size={42} />

                    </div>

                    <h2 className="
                mt-6
                text-2xl sm:text-3xl
                font-bold
                text-gray-800
            ">
                        No Schools Found
                    </h2>

                    <p className="
                mt-3
                text-gray-500
                max-w-lg
                mx-auto
                leading-relaxed
            ">
                        No registered schools matched your search.
                        Try changing the keyword or add new schools.
                    </p>

                </div>

            )}

        </div>
    );
}