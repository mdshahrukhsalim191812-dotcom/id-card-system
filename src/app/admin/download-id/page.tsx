"use client";

import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { formatDate } from "@/lib/formatDate";
import TemplateRenderer from "@/components/TemplateRenderer";

import {
    School,
    Users,
    Download,
    Loader2,
    GraduationCap,
    FileText,
} from "lucide-react";

type SchoolType = {
    _id: string;
    name: string;

    email?: string;

    templateId?: string;

    templateImage?: string;
};

type StudentType = {
    _id: string;

    name: string;
    class: string;
    roll: string;

    father?: string;
    mother?: string;
    phone?: string;
    address?: string;
    blood?: string;
    dob?: string;

    image?: string;
    logo?: string;
    signature?: string;

    schoolId?: {
        _id: string;
        name: string;
        email?: string;

        templateId?: string;
        templateImage?: string;
    };
};

export default function AdminDownloadIDPage() {

    const [schools, setSchools] = useState<SchoolType[]>([]);
    const [selectedSchool, setSelectedSchool] = useState("");

    const [loadingStudents, setLoadingStudents] = useState(false);
    const [students, setStudents] = useState<StudentType[]>([]);

    const [selectedClass, setSelectedClass] = useState("");

    const [generating, setGenerating] = useState(false);

    const [currentStudent, setCurrentStudent] =
        useState<any>(null);

    const [loadingPage, setLoadingPage] =
        useState(true);

    const [downloadProgress, setDownloadProgress] =
        useState(0);

    const cardRef =
        useRef<HTMLDivElement>(null);

    // ================= FETCH SCHOOLS =================
    useEffect(() => {

        const fetchSchools = async () => {

            try {

                const res = await fetch(
                    "/api/admin/schools"
                );

                const data = await res.json();

                setSchools(data);

            } catch (error) {

                console.log(error);

            } finally {

                setTimeout(() => {

                    setLoadingPage(false);

                }, 1000);
            }
        };

        fetchSchools();

    }, []);

    // ================= FETCH STUDENTS =================
    useEffect(() => {

        if (!selectedSchool) {

            setStudents([]);

            return;
        }

        const fetchStudents = async () => {

            try {

                setLoadingStudents(true);

                const res = await fetch(
                    "/api/admin/students"
                );

                const data = await res.json();

                const filtered = data.filter(
                    (student: StudentType) =>
                        student.schoolId?._id === selectedSchool
                );

                setStudents(filtered);

            } catch (error) {

                console.log(error);

            } finally {

                setLoadingStudents(false);
            }
        };

        fetchStudents();

    }, [selectedSchool]);

    // ================= FILTER =================
    const filteredStudents = selectedClass

        ? students.filter(
            (student) =>
                student.class === selectedClass
        )

        : students;

    const classes = Array.from(
        new Set(
            students.map(
                (student) => student.class
            )
        )
    );

    // ================= DOWNLOAD PDF =================
    const handleDownloadPDF = async () => {
        try {
            setGenerating(true);
            setDownloadProgress(10);

            const response = await fetch(
                "/api/generate-pdf",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        students: filteredStudents,
                        background: "/templates/new-era.jpg",
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to generate PDF");
            }

            setDownloadProgress(50);

            const blob = await response.blob();

            setDownloadProgress(80);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            const selectedSchoolData = schools.find(
                (school) => school._id === selectedSchool
            );

            const schoolName =
                selectedSchoolData?.name || "School";

            const className =
                selectedClass || "All";

            a.download = `${schoolName}-${className}.pdf`;

            document.body.appendChild(a);

            setDownloadProgress(95);

            a.click();

            document.body.removeChild(a);

            window.URL.revokeObjectURL(url);

            setDownloadProgress(100);

            setTimeout(() => {
                setGenerating(false);
                setDownloadProgress(0);
            }, 1000);

        } catch (error) {
            console.error(error);

            alert("PDF generation failed");

            setGenerating(false);
            setDownloadProgress(0);
        }
    };
    // ================= PAGE LOADING =================
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

                        <Download
                            size={55}
                            className="text-white animate-pulse"
                        />

                    </div>

                    {/* TITLE */}
                    <h2 className="
                        mt-8 text-4xl
                        font-extrabold text-white
                    ">
                        Loading Download Id Card Panel
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

        <div className="min-h-screen bg-[#F4F7FB] p-4 sm:p-6">

            {/* HEADER */}
            <div className="
                bg-gradient-to-r
                from-[#021B33]
                via-[#04284B]
                to-[#063B6E]
                rounded-3xl
                p-6 sm:p-8
                text-white
                shadow-xl
                mb-8
            ">

                <div className="
                    flex flex-col lg:flex-row
                    lg:items-center
                    lg:justify-between
                    gap-6
                ">

                    <div>

                        <h1 className="
                            text-3xl sm:text-5xl
                            font-extrabold
                        ">
                            Download ID Cards
                        </h1>

                        <p className="
                            text-blue-100 mt-3
                        ">
                            Download school ID cards professionally.
                        </p>

                    </div>

                    {/* STATS */}
                    <div className="
                        bg-white/10 backdrop-blur-xl
                        border border-white/10
                        rounded-3xl p-5
                        flex items-center gap-5
                    ">

                        <div className="
                            w-16 h-16 rounded-2xl
                            bg-white/10
                            flex items-center justify-center
                        ">

                            <Users size={30} />

                        </div>

                        <div>

                            <p className="text-blue-100">
                                Students
                            </p>

                            <h2 className="
                                text-4xl font-extrabold
                            ">
                                {filteredStudents.length}
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            {/* GRID */}
            <div className="
                grid grid-cols-1
                xl:grid-cols-2
                gap-6
            ">

                {/* LEFT */}
                <div className="
                    bg-white rounded-3xl
                    p-6 shadow-md
                    border border-gray-100
                ">

                    <h2 className="
                        text-2xl font-bold
                        text-gray-800
                    ">
                        School Download
                    </h2>

                    <p className="
                        text-gray-500 mt-2
                    ">
                        Select school and class
                        to generate professional PDFs.
                    </p>

                    {/* SCHOOL */}
                    <div className="mt-6">

                        <label className="
                            font-semibold text-gray-700
                            flex items-center gap-2
                            mb-3
                        ">

                            <School size={18} />

                            Select School

                        </label>

                        <select
                            value={selectedSchool}
                            onChange={(e) =>
                                setSelectedSchool(
                                    e.target.value
                                )
                            }
                            className="
                                w-full px-4 py-3
                                rounded-2xl
                                border border-gray-200
                                outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        >

                            <option value="">
                                Select School
                            </option>

                            {schools.map((school) => (

                                <option
                                    key={school._id}
                                    value={school._id}
                                >
                                    {school.name}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* CLASS */}
                    <div className="mt-6">

                        <label className="
                            font-semibold text-gray-700
                            flex items-center gap-2
                            mb-3
                        ">

                            <GraduationCap size={18} />

                            Select Class

                        </label>

                        <select
                            value={selectedClass}
                            onChange={(e) =>
                                setSelectedClass(
                                    e.target.value
                                )
                            }
                            className="
                                w-full px-4 py-3
                                rounded-2xl
                                border border-gray-200
                                outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        >

                            <option value="">
                                All Classes
                            </option>

                            {classes.map((cls) => (

                                <option
                                    key={cls}
                                    value={cls}
                                >
                                    Class {cls}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* BUTTON */}
                    <button
                        disabled={
                            !selectedSchool ||
                            generating
                        }
                        onClick={handleDownloadPDF}
                        className="
                            mt-8 w-full
                            bg-blue-600 hover:bg-blue-700
                            disabled:bg-gray-300
                            text-white py-4
                            rounded-2xl
                            font-bold
                            flex items-center
                            justify-center gap-3
                            transition
                        "
                    >

                        {generating ? (

                            <>
                                <Loader2
                                    className="animate-spin"
                                    size={22}
                                />

                                Generating PDF...
                            </>

                        ) : (

                            <>
                                <Download size={22} />

                                Download School IDs
                            </>

                        )}

                    </button>

                    {/* STUDENTS */}
                    <div className="mt-8">

                        <h3 className="
                            font-bold text-gray-800
                            mb-4
                        ">
                            Students
                        </h3>

                        {loadingStudents ? (

                            <div className="
                                flex items-center gap-3
                                text-gray-500
                            ">

                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />

                                Loading students...

                            </div>

                        ) : (

                            <div className="
                                max-h-[350px]
                                overflow-y-auto
                                space-y-3
                            ">

                                {filteredStudents.map((student) => (

                                    <div
                                        key={student._id}
                                        className="
                                            bg-gray-50
                                            border border-gray-100
                                            rounded-2xl
                                            px-4 py-4
                                            flex items-center
                                            justify-between
                                        "
                                    >

                                        <div>

                                            <h4 className="
                                                font-bold
                                                text-gray-800
                                            ">
                                                {student.name}
                                            </h4>

                                            <p className="
                                                text-sm
                                                text-gray-500
                                                mt-1
                                            ">
                                                Class {student.class}
                                                • Roll {student.roll}
                                            </p>

                                        </div>

                                        <div className="
                                            w-12 h-12
                                            rounded-2xl
                                            bg-blue-100
                                            text-blue-600
                                            flex items-center
                                            justify-center
                                            font-bold
                                        ">

                                            {student.name.charAt(0)}

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </div>

            </div>

            {/* DOWNLOAD OVERLAY */}
            {generating && (

                <div className="
                    fixed inset-0 z-50
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

                    {/* CONTENT */}
                    <div className="
                        relative z-10
                        text-center px-6
                    ">

                        {/* ICON */}
                        <div className="
                            w-28 h-28 rounded-full
                            bg-white/10
                            backdrop-blur-xl
                            border border-white/10
                            flex items-center justify-center
                            mx-auto shadow-2xl
                        ">

                            <FileText
                                size={55}
                                className="
                                    text-white
                                    animate-pulse
                                "
                            />

                        </div>

                        {/* TITLE */}
                        <h2 className="
                            mt-8 text-4xl
                            font-extrabold text-white
                        ">
                            Generating ID Cards
                        </h2>

                        <p className="
                            mt-3 text-blue-100
                            max-w-md mx-auto
                        ">
                            Please wait while we
                            prepare your professional
                            school ID card PDF.
                        </p>

                        {/* PROGRESS */}
                        <div className="
                            mt-8 w-full max-w-md
                            bg-white/10
                            rounded-full
                            h-4 overflow-hidden
                        ">

                            <div
                                className="
                                    h-full
                                    bg-gradient-to-r
                                    from-blue-400
                                    to-cyan-400
                                    transition-all
                                    duration-300
                                "
                                style={{
                                    width:
                                        `${downloadProgress}%`,
                                }}
                            />

                        </div>

                        {/* TEXT */}
                        <p className="
                            mt-4 text-white
                            font-semibold
                        ">
                            {downloadProgress}%
                        </p>

                    </div>

                </div>

            )}

            {/* PDF CAPTURE AREA */}
            <div
                style={{
                    position: "fixed",
                    left: "-9999px",
                    top: "0",
                    width: "300px",
                    height: "476px",
                }}
            >

                <div
                    ref={cardRef}
                    style={{
                        width: "300px",
                        height: "476px",
                        border: "5px solid red",
                    }}
                >

                    {currentStudent && (

                        <TemplateRenderer
                            templateId={
                                currentStudent.schoolId.templateId
                            }

                            student={currentStudent}

                            image={currentStudent.image}

                            logo={currentStudent.logo}

                            signature={currentStudent.signature}

                            formatDate={formatDate}

                            school={currentStudent.schoolId}
                        />

                    )}

                </div>

            </div>

        </div>
    );
}