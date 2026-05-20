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
import { FaFileDownload } from "react-icons/fa";

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
    const handleDownloadExcel = () => {

        if (filteredStudents.length === 0) return;

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

        // COLUMN WIDTH
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

        // DOWNLOAD
        XLSX.writeFile(
            workbook,
            fileName
        );
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
                            className="
                                flex items-center justify-center gap-2
                                bg-green-500 hover:bg-green-600
                                px-6 py-3 rounded-2xl
                                font-semibold shadow-xl transition
                            "
                        >

                            <FaFileDownload size={20} />

                            Download Excel

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

        </div>
    );
}