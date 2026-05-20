"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
    Download,
    School,
    Users,
    Search,
    FileSpreadsheet,
} from "lucide-react";

type StudentType = {
    _id: string;
    name: string;
    class: string;
    roll: string;
    father?: string;
    mother?: string;
    phone?: string;
    address?: string;
    admissionNo?: string;
    schoolId?: {
        _id: string;
        name: string;
    };
};

export default function DownloadExcelPage() {

    const [students, setStudents] = useState<StudentType[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedSchool, setSelectedSchool] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [search, setSearch] = useState("");

    const [downloading, setDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);

    // FETCH STUDENTS
    useEffect(() => {

        const fetchStudents = async () => {

            try {

                const res = await fetch(
                    "/api/admin/students"
                );

                const data = await res.json();

                setStudents(data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

        fetchStudents();

    }, []);

    // UNIQUE SCHOOLS
    const schools = Array.from(
        new Map(
            students.map((s) => [
                s.schoolId?._id,
                s.schoolId,
            ])
        ).values()
    );

    // UNIQUE CLASSES
    const classes = Array.from(
        new Set(
            students.map((s) => s.class)
        )
    );

    // FILTER
    const filteredStudents = students.filter((student) => {

        const matchSchool =
            !selectedSchool ||
            student.schoolId?._id === selectedSchool;

        const matchClass =
            !selectedClass ||
            student.class === selectedClass;

        const matchSearch =
            student.name
                .toLowerCase()
                .includes(search.toLowerCase());

        return (
            matchSchool &&
            matchClass &&
            matchSearch
        );
    });

    // DOWNLOAD EXCEL
    const handleDownloadExcel = async () => {

        if (filteredStudents.length === 0) return;

        try {

            setDownloading(true);
            setDownloadProgress(0);

            // FAKE PROGRESS ANIMATION
            let progress = 0;

            const interval = setInterval(() => {

                progress += 10;

                if (progress <= 90) {
                    setDownloadProgress(progress);
                }

            }, 200);

            // FORMAT DATA
            const excelData = filteredStudents.map(
                (student, index) => ({
                    "SL No": index + 1,
                    "Student Name": student.name,
                    "Class": student.class,
                    "Roll No": student.roll,
                    "Admission No": student.admissionNo || "",
                    "Father Name": student.father || "",
                    "Mother Name": student.mother || "",
                    "Phone": student.phone || "",
                    "Address": student.address || "",
                    "School": student.schoolId?.name || "",
                })
            );

            // CREATE WORKSHEET
            const worksheet =
                XLSX.utils.json_to_sheet(excelData);

            worksheet["!cols"] = [
                { wch: 8 },
                { wch: 25 },
                { wch: 10 },
                { wch: 10 },
                { wch: 18 },
                { wch: 25 },
                { wch: 25 },
                { wch: 18 },
                { wch: 35 },
                { wch: 30 },
            ];

            // CREATE WORKBOOK
            const workbook =
                XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                "Students"
            );

            // SCHOOL NAME
            const schoolName =
                schools
                    .find(
                        (s) => s?._id === selectedSchool
                    )
                    ?.name?.replace(/\s+/g, "-")
                    ?.toLowerCase() || "all-schools";

            // CLASS NAME
            const className =
                selectedClass
                    ? `class-${selectedClass}`
                    : "all-classes";

            // FILE NAME
            const fileName =
                `${schoolName}-${className}-students.xlsx`;

            // WAIT FOR UX
            await new Promise((resolve) =>
                setTimeout(resolve, 1800)
            );

            // DOWNLOAD FILE
            XLSX.writeFile(
                workbook,
                fileName
            );

            clearInterval(interval);

            setDownloadProgress(100);

            // HIDE LOADER
            setTimeout(() => {

                setDownloading(false);
                setDownloadProgress(0);

            }, 1000);

        } catch (error) {

            console.log(error);

            setDownloading(false);
            setDownloadProgress(0);
        }
    };

    // LOADING UI
    if (loading) {

        return (

            <div className="min-h-screen bg-gradient-to-br from-[#021B33] via-[#04284B] to-[#063B6E] flex items-center justify-center">

                <div className="text-center">

                    <div className="w-20 h-20 rounded-full border-4 border-white/20 border-t-white animate-spin mx-auto"></div>

                    <h2 className="mt-6 text-3xl font-bold text-white">
                        Loading Excel Panel
                    </h2>

                    <p className="text-blue-100 mt-2">
                        Please wait...
                    </p>

                </div>

            </div>
        );
    }

    return (

        <div className="min-h-screen bg-[#F4F7FB]">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-[#021B33] via-[#04284B] to-[#063B6E] text-white">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                        {/* LEFT */}
                        <div>

                            <h1 className="text-3xl sm:text-4xl font-extrabold">
                                Download Excel
                            </h1>

                            <p className="text-blue-100 mt-2">
                                Export students database professionally.
                            </p>

                        </div>

                        {/* RIGHT */}
                        <button
                            onClick={handleDownloadExcel}
                            disabled={downloading}
                            className="
        flex items-center justify-center gap-2
        bg-green-500 hover:bg-green-600
        disabled:bg-green-300
        px-6 py-3 rounded-2xl
        font-semibold shadow-xl transition
    "
                        >

                            {downloading ? (

                                <>
                                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>

                                    Preparing Excel...
                                </>

                            ) : (

                                <>
                                    <FileSpreadsheet size={20} />

                                    Download Excel
                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

            {/* CONTENT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* FILTERS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* SCHOOL */}
                    <div className="bg-white rounded-3xl p-5 shadow-md">

                        <label className="font-semibold text-gray-700 flex items-center gap-2 mb-3">

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
                                w-full px-4 py-3 rounded-2xl
                                border border-gray-200
                                outline-none
                            "
                        >

                            <option value="">
                                All Schools
                            </option>

                            {schools.map((school: any) => (

                                <option
                                    key={school?._id}
                                    value={school?._id}
                                >
                                    {school?.name}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* CLASS */}
                    <div className="bg-white rounded-3xl p-5 shadow-md">

                        <label className="font-semibold text-gray-700 flex items-center gap-2 mb-3">

                            <Users size={18} />

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
                                w-full px-4 py-3 rounded-2xl
                                border border-gray-200
                                outline-none
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

                    {/* SEARCH */}
                    <div className="bg-white rounded-3xl p-5 shadow-md">

                        <label className="font-semibold text-gray-700 flex items-center gap-2 mb-3">

                            <Search size={18} />

                            Search Student

                        </label>

                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="
                                w-full px-4 py-3 rounded-2xl
                                border border-gray-200
                                outline-none
                            "
                        />

                    </div>

                </div>

                {/* STATS */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    {/* TOTAL */}
                    <div className="bg-white rounded-3xl p-6 shadow-md">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500">
                                    Total Students
                                </p>

                                <h2 className="text-4xl font-extrabold text-blue-600 mt-2">
                                    {filteredStudents.length}
                                </h2>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">

                                <Users size={30} />

                            </div>

                        </div>

                    </div>

                    {/* SCHOOLS */}
                    <div className="bg-white rounded-3xl p-6 shadow-md">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500">
                                    Schools
                                </p>

                                <h2 className="text-4xl font-extrabold text-green-600 mt-2">
                                    {schools.length}
                                </h2>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">

                                <School size={30} />

                            </div>

                        </div>

                    </div>

                    {/* EXCEL */}
                    <div className="bg-white rounded-3xl p-6 shadow-md">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500">
                                    Export Ready
                                </p>

                                <h2 className="text-2xl font-extrabold text-orange-500 mt-2">
                                    XLSX
                                </h2>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">

                                <FileSpreadsheet size={30} />

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* DOWNLOAD OVERLAY */}
            {downloading && (

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
            bg-green-500/20 blur-3xl
            rounded-full animate-pulse
        "></div>

                    {/* CONTENT */}
                    <div className="relative z-10 text-center px-6">

                        {/* ICON */}
                        <div className="
                w-28 h-28 rounded-full
                bg-white/10 backdrop-blur-xl
                border border-white/10
                flex items-center justify-center
                mx-auto shadow-2xl
            ">

                            <FileSpreadsheet
                                size={55}
                                className="text-white animate-pulse"
                            />

                        </div>

                        {/* TITLE */}
                        <h2 className="
                mt-8 text-3xl sm:text-4xl
                font-extrabold text-white
            ">
                            Preparing Excel File
                        </h2>

                        {/* TEXT */}
                        <p className="
                mt-3 text-blue-100
                max-w-md mx-auto
            ">
                            Please wait while we generate
                            your professional student report.
                        </p>

                        {/* PROGRESS */}
                        <div className="
                mt-8 w-full max-w-md
                bg-white/10 rounded-full
                h-4 overflow-hidden
            ">

                            <div
                                className="
                        h-full bg-gradient-to-r
                        from-green-400 to-emerald-500
                        transition-all duration-300
                    "
                                style={{
                                    width: `${downloadProgress}%`,
                                }}
                            />

                        </div>

                        {/* PERCENT */}
                        <p className="
                mt-4 text-white font-semibold
            ">
                            {downloadProgress}%
                        </p>

                    </div>

                </div>

            )}

        </div>
    );
}