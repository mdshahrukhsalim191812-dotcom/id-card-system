"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/formatDate";

import {
    User,
    School,
    Phone,
    MapPin,
    GraduationCap,
    Hash,
    BadgeInfo,
    Users,
} from "lucide-react";

import NewEraEnglishSchool from "@/components/templates/NewEraEnglishSchool";
import BalBhartiSchool from "@/components/templates/BalBhartiSchool";
import HappyValleySchoolBhagalpur from "@/components/templates/HappyValleySchoolBhagalpur";

export default function StudentDetailsPage({
    params,
}: {
    params: { id: string };
}) {

    const [student, setStudent] = useState<any>(null);
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {

        fetch("/api/admin/students")
            .then((res) => res.json())
            .then((data) => {

                const foundStudent = data.find(
                    (s: any) => s._id === params.id
                );

                setStudent(foundStudent);

                setTimeout(() => {
                    setLoadingPage(false);
                }, 2000);

            });

    }, [params.id]);

    // ================= LOADING UI =================

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

                        <Users
                            size={55}
                            className="text-white animate-pulse"
                        />

                    </div>

                    {/* TITLE */}
                    <h2 className="
                        mt-8 text-4xl
                        font-extrabold text-white
                    ">
                        Loading <span className="text-emerald-400">{student?.name || "Student"}</span> Review
                    </h2>

                    <p className="
                        text-blue-100 mt-3
                        max-w-md mx-auto
                    ">
                        Loadin student's information and rendering the ID card template. Please wait a moment.
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

    // ================= STUDENT NOT FOUND =================

    if (!student) {

        return (

            <div className="min-h-screen bg-[#071028] flex items-center justify-center p-6">

                <div className="bg-[#0f172a] border border-red-500/30 rounded-3xl shadow-2xl p-10 text-center max-w-md w-full">

                    <h1 className="text-4xl font-black text-red-500">
                        Student Not Found
                    </h1>

                    <p className="text-gray-400 mt-4">
                        No student information available.
                    </p>

                </div>

            </div>

        );

    }

    const templateId = student?.schoolId?.templateId;

    const commonProps = {
        student,
        image: student.image,
        logo: student.logo,
        signature: student.signature,
        school: student.schoolId,
        formatDate,
    };

    return (

        <div className="min-h-screen bg-white text-white">

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

                                <Users size={34} />

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
                                    {student.name} Review
                                </h1>

                                <p
                                    className="
                                    mt-3

                                    text-blue-100

                                    text-sm
                                    sm:text-base

                                    max-w-2xl

                                    leading-relaxed
                                    relative
                                "
                                >
                                    <span className="gap-2">
                                        {student.schoolId?.name}
                                    </span>
                                    <span>
                                        -
                                    </span>
                                    <span className="bg-blue-400 text-white w-[30px] gap-1">Class {student.class}</span>

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


                        </div>

                    </div>

                </div>

            </div>

            {/* ================= MAIN ================= */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">

                {/* 
                    MOBILE:
                    ID CARD FIRST
                    DETAILS SECOND

                    DESKTOP:
                    ID CARD LEFT
                    DETAILS RIGHT
                */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">

                    {/* ================= ID CARD PREVIEW ================= */}

                    <div className="order-1">

                        <div className="rounded-[32px] border border-white/10 bg-gray-100 shadow-[0_0_80px_rgba(0,150,255,0.08)] overflow-hidden">

                            {/* HEADER */}

                            <div className="px-6 py-5 border-b border-white/10 bg-gradient-to-r from-cyan-500 to-blue-600">

                                <h2 className="text-3xl font-black text-white flex items-center gap-3">



                                    {/* ACTIVE DOT */}

                                    <span className="relative flex h-4 w-4">

                                        {/* PING EFFECT */}

                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-700 opacity-75"></span>

                                        {/* MAIN DOT */}

                                        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>

                                    </span>
                                    Live ID Card Preview
                                </h2>

                            </div>

                            {/* BODY */}

                            <div className="p-4 sm:p-6 md:p-10 overflow-auto">

                                <div className="flex justify-center items-start">

                                    {/* TEMPLATE */}

                                    {templateId === "NewEraEnglishSchool" && (
                                        <NewEraEnglishSchool
                                            {...commonProps}
                                        />
                                    )}

                                    {templateId === "BalBhartiSchool" && (
                                        <BalBhartiSchool
                                            {...commonProps}
                                        />
                                    )}

                                    {templateId === "HappyValleySchoolBhagalpur" && (
                                        <HappyValleySchoolBhagalpur
                                            {...commonProps}
                                        />
                                    )}

                                    {!templateId && (

                                        <div className="text-center py-20">

                                            <h2 className="text-4xl font-black text-red-500">
                                                No Template Found
                                            </h2>

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}