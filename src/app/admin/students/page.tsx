"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import {
    Search,
    Users,
    School,
    GraduationCap,
    Trash2,
} from "lucide-react";
import Student from "@/models/Student";

type Student = {
    _id: string;
    name: string;
    class: string;
    roll: string;
    admissionNo?: string;

    schoolId?: {
        _id: string;
        name: string;
        email: string;
    };
};

export default function AdminStudentsPage() {

    const [students, setStudents] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [search, setSearch] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [classes, setClasses] = useState<string[]>([]);
    const [loadingPage, setLoadingPage] = useState(true);

    // FETCH STUDENTS
    useEffect(() => {

        const fetchStudents = async () => {

            try {

                const res = await fetch("/api/admin/students");

                const data = await res.json();

                setStudents(data);
                setFilteredStudents(data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoadingPage(false);
            }
        };

        fetchStudents();

    }, []);

    // FILTER
    useEffect(() => {

        let filtered = students;

        // SEARCH
        if (search) {

            filtered = filtered.filter((student) =>
                student.name.toLowerCase().includes(search.toLowerCase()) ||
                student.class.toLowerCase().includes(search.toLowerCase()) ||
                student.roll.toLowerCase().includes(search.toLowerCase())
            );
        }

        // SCHOOL FILTER
        if (selectedSchool) {

            filtered = filtered.filter(
                (student) => student.schoolId?._id === selectedSchool
            );
        }

        // CLASS FILTER
        if (selectedClass) {

            filtered = filtered.filter(
                (student) => student.class === selectedClass
            );
        }

        setFilteredStudents(filtered);

    }, [search, selectedSchool, selectedClass, students]);

    // ================= CLASSES BASED ON SELECTED SCHOOL =================

    useEffect(() => {

        if (!selectedSchool) {

            setClasses([]);
            setSelectedClass("");

            return;
        }

        const filteredBySchool = students.filter(
            (student) =>
                student.schoolId?._id === selectedSchool
        );

        const uniqueClasses = Array.from(
            new Set(
                filteredBySchool.map(
                    (student) => student.class
                )
            )
        );

        setClasses(uniqueClasses);

    }, [selectedSchool, students]);

    // UNIQUE SCHOOLS
    const schools = Array.from(
        new Map(
            students.map((s) => [
                s.schoolId?._id,
                s.schoolId,
            ])
        ).values()
    );

    const handleDelete = async (
        id: string,
        studentName: string
    ) => {

        toast((t) => (

            <div className="flex flex-col gap-4">

                <div>

                    <h2 className="font-bold text-gray-800 text-lg">
                        Delete Student?
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {studentName} will be permanently deleted.
                    </p>

                </div>

                <div className="flex justify-end gap-3">

                    {/* CANCEL */}
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

                    {/* DELETE */}
                    <button
                        onClick={async () => {

                            toast.dismiss(t.id);

                            const loadingToast = toast.loading(
                                "Deleting student..."
                            );

                            try {

                                const res = await fetch(
                                    `/api/students?id=${id}`,
                                    {
                                        method: "DELETE",
                                    }
                                );

                                const data = await res.json();

                                toast.dismiss(loadingToast);

                                if (data.success) {

                                    setStudents((prev) =>
                                        prev.filter(
                                            (student) =>
                                                student._id !== id
                                        )
                                    );

                                    toast.success(
                                        "Student deleted successfully"
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
                        Loading Students Panel
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
            <div className="mb-8">

                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                    Students Management
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage all schools students from one panel.
                </p>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

                <div className="bg-white rounded-3xl p-6 shadow-sm border">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Total Students
                            </p>

                            <h2 className="text-4xl font-extrabold mt-2 text-blue-600">
                                {students.length}
                            </h2>

                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                            <Users size={28} />
                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Total Schools
                            </p>

                            <h2 className="text-4xl font-extrabold mt-2 text-green-600">
                                {schools.length}
                            </h2>

                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                            <School size={28} />
                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Showing Results
                            </p>

                            <h2 className="text-4xl font-extrabold mt-2 text-orange-500">
                                {filteredStudents.length}
                            </h2>

                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500">
                            <GraduationCap size={28} />
                        </div>

                    </div>

                </div>

            </div>

            {/* FILTERS */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border mb-8">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* SEARCH */}
                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search students..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                    </div>

                    {/* FILTER */}
                    <select
                        value={selectedSchool}
                        onChange={(e) => setSelectedSchool(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
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

                    {/* CLASS FILTER */}
                    <select
                        value={selectedClass}
                        onChange={(e) =>
                            setSelectedClass(e.target.value)
                        }
                        disabled={!selectedSchool}
                        className="
        w-full
        px-4 py-3
        rounded-2xl
        border border-gray-200
        focus:ring-2
        focus:ring-blue-500
        outline-none

        disabled:bg-gray-100
        disabled:cursor-not-allowed
    "
                    >

                        <option value="">
                            All Classes
                        </option>

                        {classes.map((cls, index) => (

                            <option
                                key={index}
                                value={cls}
                            >
                                {cls}
                            </option>

                        ))}

                    </select>

                </div>

            </div>

            {/* TABLE DESKTOP */}
            <div className="
    hidden lg:block
    bg-white
    rounded-[30px]
    shadow-sm
    border border-gray-100
    overflow-hidden
">

                {/* HEADER */}
                <div className="
        px-8 py-6
        border-b border-gray-100
        flex items-center justify-between
    ">

                    <div>

                        <h2 className="
                text-2xl
                font-bold
                text-gray-800
            ">
                            Students Database
                        </h2>

                        <p className="
                text-sm
                text-gray-500
                mt-1
            ">
                            Manage all students professionally
                        </p>

                    </div>

                    <div className="
            px-4 py-2
            rounded-xl
            bg-blue-50
            text-blue-600
            text-sm
            font-semibold
        ">

                        {filteredStudents.length} Results

                    </div>

                </div>

                {/* TABLE */}
                <table className="w-full">

                    <thead className="bg-[#F8FAFC]">

                        <tr>

                            <th className="
                    px-8 py-5
                    text-left
                    text-sm
                    font-bold
                    text-gray-600
                ">
                                Student
                            </th>

                            <th className="
                    px-5 py-5
                    text-left
                    text-sm
                    font-bold
                    text-gray-600
                ">
                                Class
                            </th>

                            <th className="
                    px-5 py-5
                    text-left
                    text-sm
                    font-bold
                    text-gray-600
                ">
                                Roll
                            </th>

                            <th className="
                    px-5 py-5
                    text-left
                    text-sm
                    font-bold
                    text-gray-600
                ">
                                Admission No
                            </th>

                            <th className="
                    px-5 py-5
                    text-left
                    text-sm
                    font-bold
                    text-gray-600
                ">
                                School
                            </th>

                            <th className="
                    px-5 py-5
                    text-center
                    text-sm
                    font-bold
                    text-gray-600
                ">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredStudents.map((student) => (

                            <tr
                                key={student._id}
                                className="
                        border-t border-gray-100
                        hover:bg-[#FAFCFF]
                        transition-all
                    "
                            >

                                {/* STUDENT */}
                                <td className="px-8 py-5">

                                    <div className="
                            flex items-center gap-4
                        ">

                                        {/* AVATAR */}
                                        <div className="
                                w-14 h-14
                                rounded-2xl
                                bg-gradient-to-br
                                from-blue-500
                                to-cyan-500
                                text-white
                                flex items-center justify-center
                                font-bold text-lg
                                shrink-0
                            ">

                                            {student.name.charAt(0)}

                                        </div>

                                        {/* INFO */}
                                        <div>

                                            <Link
                                                href={`/admin/students/${student._id}`}
                                                className="
    text-lg
    font-bold
    text-blue-600
    hover:text-blue-800
    hover:underline
    transition
  "
                                            >
                                                {student.name}
                                            </Link>

                                            <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                                {student.schoolId?.name}
                                            </p>

                                        </div>

                                    </div>

                                </td>

                                {/* CLASS */}
                                <td className="px-5 py-5">

                                    <span className="
                            px-3 py-1.5
                            rounded-xl
                            bg-blue-50
                            text-blue-600
                            text-sm
                            font-semibold
                        ">

                                        {student.class}

                                    </span>

                                </td>

                                {/* ROLL */}
                                <td className="
                        px-5 py-5
                        font-semibold
                        text-gray-700
                    ">

                                    {student.roll}

                                </td>

                                {/* ADMISSION */}
                                <td className="
                        px-5 py-5
                        text-gray-700
                        font-medium
                    ">

                                    {student.admissionNo || "N/A"}

                                </td>

                                {/* SCHOOL */}
                                <td className="
                        px-5 py-5
                        text-gray-700
                        font-medium
                    ">

                                    {student.schoolId?.name}

                                </td>

                                {/* ACTION */}
                                <td className="
                        px-5 py-5
                        text-center
                    ">

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                student._id,
                                                student.name
                                            )
                                        }
                                        className="
                                inline-flex
                                items-center gap-2
                                bg-red-500
                                hover:bg-red-600
                                text-white
                                px-5 py-2.5
                                rounded-xl
                                font-semibold
                                transition-all duration-300
                            "
                                    >

                                        <Trash2 size={16} />

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* MOBILE CARDS */}
            <div className="lg:hidden space-y-5">

                {filteredStudents.map((student) => (

                    <div
                        key={student._id}
                        className="
                bg-white
                rounded-[28px]
                p-5
                shadow-sm
                border border-gray-100
            "
                    >

                        {/* TOP */}
                        <div className="
                flex items-start justify-between
                gap-4
            ">

                            {/* LEFT */}
                            <div className="
                    flex items-center gap-4
                    min-w-0
                ">

                                {/* AVATAR */}
                                <div className="
                        w-14 h-14
                        rounded-2xl
                        bg-gradient-to-br
                        from-blue-500
                        to-cyan-500
                        text-white
                        flex items-center justify-center
                        font-bold text-xl
                        shrink-0
                    ">

                                    {student.name.charAt(0)}

                                </div>

                                {/* INFO */}
                                <div className="min-w-0">

                                    <Link
                                        href={`/admin/students/${student._id}`}
                                        className="
    text-lg
    font-bold
    text-blue-600
    hover:text-blue-800
    hover:underline
    transition
  "
                                    >
                                        {student.name}
                                    </Link>

                                    <p className="
                            text-sm
                            text-gray-500
                            mt-1
                            break-words
                        ">

                                        {student.schoolId?.name}

                                    </p>

                                </div>

                            </div>

                            {/* CLASS BADGE */}
                            <div className="
                    shrink-0
                    bg-blue-50
                    text-blue-600
                    px-3 py-1.5
                    rounded-xl
                    text-sm
                    font-semibold
                    border border-blue-100
                ">

                                Class {student.class}

                            </div>

                        </div>

                        {/* DETAILS */}
                        <div className="
                mt-5
                grid grid-cols-2
                gap-4
            ">

                            {/* ROLL */}
                            <div className="
                    bg-gray-50
                    rounded-2xl
                    p-4
                ">

                                <p className="
                        text-xs
                        text-gray-400
                        uppercase
                        tracking-wide
                    ">
                                    Roll Number
                                </p>

                                <p className="
                        mt-1
                        font-bold
                        text-gray-800
                        text-lg
                    ">
                                    {student.roll}
                                </p>

                            </div>

                            {/* ADMISSION */}
                            <div className="
                    bg-gray-50
                    rounded-2xl
                    p-4
                ">

                                <p className="
                        text-xs
                        text-gray-400
                        uppercase
                        tracking-wide
                    ">
                                    Admission No
                                </p>

                                <p className="
                        mt-1
                        font-bold
                        text-gray-800
                        text-sm
                        break-words
                    ">
                                    {student.admissionNo || "N/A"}
                                </p>

                            </div>

                        </div>

                        {/* DELETE BUTTON */}
                        <div className="mt-5">

                            <button
                                onClick={() =>
                                    handleDelete(
                                        student._id,
                                        student.name
                                    )
                                }
                                className="
                        w-full
                        flex items-center justify-center
                        gap-2
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        py-3
                        rounded-2xl
                        font-semibold
                        transition-all duration-300
                        active:scale-[0.98]
                    "
                            >

                                <Trash2 size={18} />

                                Delete Student

                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}