"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import TemplateRenderer from "@/components/TemplateRenderer";

type SchoolType = {
    _id: string;
    name: string;
};

type StudentType = {
    _id: string;
    name: string;
    class: string;
    roll: string;
};

export default function AdminDownloadIDPage() {

    const [schools, setSchools] = useState<SchoolType[]>([]);
    const [selectedSchool, setSelectedSchool] = useState("");
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [students, setStudents] = useState<StudentType[]>([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [generating, setGenerating] = useState(false);

    const [currentStudent, setCurrentStudent] = useState<any>(null);

    const cardRef = useRef<HTMLDivElement>(null);

    // FETCH SCHOOLS
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
            }
        };

        fetchSchools();

    }, []);

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

                // FILTER SCHOOL STUDENTS
                const filtered = data.filter(
                    (student: any) =>
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

    const filteredStudents = selectedClass

        ? students.filter(
            (student) =>
                student.class === selectedClass
        )

        : students;

    const classes = Array.from(
        new Set(
            students.map((student) => student.class)
        )
    );

    const handleDownloadPDF = async () => {

        if (filteredStudents.length === 0) return;

        try {

            setGenerating(true);

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: [300, 476],
            });

            for (let i = 0; i < filteredStudents.length; i++) {

                const student = filteredStudents[i];

                // SET CURRENT STUDENT
                setCurrentStudent(student);

                // WAIT FOR RENDER
                await new Promise((resolve) =>
                    setTimeout(resolve, 700)
                );

                if (!cardRef.current) continue;

                // CAPTURE CARD
                const canvas = await html2canvas(cardRef.current, {
                    scale: 3,
                    useCORS: true,
                });

                const imgData = canvas.toDataURL("image/png");

                // ADD PAGE
                if (i > 0) {
                    pdf.addPage([300, 476], "portrait");
                }

                pdf.addImage(
                    imgData,
                    "PNG",
                    0,
                    0,
                    300,
                    476
                );
            }

            // DOWNLOAD
            // FIND SCHOOL NAME
            const schoolData = schools.find(
                (school) => school._id === selectedSchool
            );

            // CLEAN SCHOOL NAME
            const schoolName =
                schoolData?.name
                    ?.replace(/\s+/g, "-")
                    ?.toLowerCase() || "school";

            // CLASS NAME
            const className = selectedClass
                ? `class-${selectedClass}`
                : "all-classes";

            // DOWNLOAD PDF
            pdf.save(
                `${schoolName}-${className}-id-cards.pdf`
            );

        } catch (error) {

            console.log(error);

        } finally {

            setGenerating(false);

        }
    };

    return (

        <div className="min-h-screen bg-[#F4F7FB] p-4 sm:p-6">

            {/* HEADER */}
            <div className="mb-8">

                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                    Download ID Cards
                </h1>

                <p className="text-gray-500 mt-2">
                    Download ID cards by school, class or student.
                </p>

            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* SCHOOL DOWNLOAD */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border">

                    <h2 className="text-2xl font-bold text-gray-800">
                        Download by School
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Select school to download all ID cards.
                    </p>

                    {/* SELECT */}
                    <select
                        value={selectedSchool}
                        onChange={(e) =>
                            setSelectedSchool(
                                e.target.value
                            )
                        }
                        className="
                            w-full mt-6 px-4 py-3
                            rounded-2xl border border-gray-200
                            focus:ring-2 focus:ring-blue-500
                            outline-none
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

                    {/* BUTTON */}
                    <button
                        disabled={!selectedSchool}
                        onClick={handleDownloadPDF}
                        className="
                            mt-6 w-full bg-blue-600
                            hover:bg-blue-700
                            disabled:bg-gray-300
                            text-white py-3 rounded-2xl
                            font-semibold transition
                        "
                    >
                        Download School IDs
                    </button>

                    {/* STUDENTS */}
                    <div className="mt-6">

                        {loadingStudents ? (

                            <p className="text-sm text-gray-500">
                                Loading students...
                            </p>

                        ) : (

                            <div className="bg-gray-50 rounded-2xl p-4">

                                <p className="text-gray-600 text-sm">
                                    Total Students
                                </p>

                                <h2 className="text-3xl font-extrabold text-blue-600 mt-1">
                                    {filteredStudents.length}
                                </h2>

                            </div>

                        )}

                    </div>

                    {/* CLASS SELECT */}
                    <div className="mt-6">

                        <label className="text-sm font-semibold text-gray-700">
                            Select Class
                        </label>

                        <select
                            value={selectedClass}
                            onChange={(e) =>
                                setSelectedClass(e.target.value)
                            }
                            className="
            w-full mt-2 px-4 py-3
            rounded-2xl border border-gray-200
            focus:ring-2 focus:ring-blue-500
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

                    {/* STUDENT LIST */}
                    <div className="mt-6">

                        <h3 className="font-bold text-gray-800 mb-3">
                            Students
                        </h3>

                        <div className="max-h-[300px] overflow-y-auto space-y-3">

                            {filteredStudents.map((student) => (

                                <div
                                    key={student._id}
                                    className="
                    bg-gray-50 border border-gray-100
                    rounded-2xl px-4 py-3
                    flex items-center justify-between
                "
                                >

                                    <div>

                                        <h4 className="font-semibold text-gray-800">
                                            {student.name}
                                        </h4>

                                        <p className="text-sm text-gray-500">
                                            Class {student.class} • Roll {student.roll}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

            {/* HIDDEN CARD RENDERER */}
            <div className="fixed -left-[9999px] top-0">

                <div
                    ref={cardRef}
                    style={{
                        width: "300px",
                        height: "476px",
                    }}
                >

                    {currentStudent && (

                        <TemplateRenderer
                            templateId={
                                currentStudent.schoolId?.templateId
                            }
                            student={currentStudent}
                            image={currentStudent.image}
                            logo={currentStudent.logo}
                            signature={currentStudent.signature}
                            formatDate={(date: any) =>
                                new Date(date).toLocaleDateString()
                            }
                            school={currentStudent.schoolId}
                        />

                    )}

                </div>

            </div>

        </div>
    );
}