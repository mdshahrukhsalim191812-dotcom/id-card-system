"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    Search,
    Users,
    School,
    GraduationCap,
    Trash2,
} from "lucide-react";

type StudentType = {
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

    const [students, setStudents] =
        useState<StudentType[]>([]);

    const [filteredStudents, setFilteredStudents] =
        useState<StudentType[]>([]);

    const [search, setSearch] =
        useState("");

    const [selectedSchool, setSelectedSchool] =
        useState("");

    const [selectedClas, setSelectedClass] =
        useState("");

    const [classes, setClasses] =
        useState<string[]>([]);

    const [loadingPage, setLoadingPage] =
        useState(true);

    // ================= FETCH STUDENTS =================
    useEffect(() => {

        const fetchStudents = async () => {

            try {

                const res =
                    await fetch("/api/admin/students");

                const data =
                    await res.json();

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

    // ================= UNIQUE SCHOOLS =================
    const schools = Array.from(

        new Map(

            students.map((student) => [

                student.schoolId?._id,
                student.schoolId,

            ])

        ).values()

    );

    // ================= FETCH CLASSES =================
    useEffect(() => {

        if (!selectedSchool) {

            setClasses([]);
            return;

        }

        const schoolStudents =
            students.filter(

                (student) =>
                    student.schoolId?._id === selectedSchool

            );

        const uniqueClasses = Array.from(

            new Set(

                schoolStudents.map(
                    (student) => student.class
                )

            )

        );

        setClasses(uniqueClasses);

    }, [selectedSchool, students]);

    // ================= FILTER STUDENTS =================
    useEffect(() => {

        let filtered = [...students];

        // SEARCH FILTER
        if (search) {

            filtered = filtered.filter((student) =>

                student.name
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                student.class
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                student.roll
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                student.admissionNo
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

            );

        }

        // SCHOOL FILTER
        if (selectedSchool) {

            filtered = filtered.filter(

                (student) =>
                    student.schoolId?._id === selectedSchool

            );

        }

        // CLASS FILTER
        if (selectedClass) {

            filtered = filtered.filter(

                (student) =>
                    student.class === selectedClass

            );

        }

        setFilteredStudents(filtered);

    }, [

        students,
        search,
        selectedSchool,
        selectedClass,

    ]);

    // ================= DELETE =================
    const handleDelete = async (
        id: string,
        studentName: string
    ) => {

        toast((t) => (

            <div className="flex flex-col gap-4">

                <div>

                    <h2 className="
                        text-lg
                        font-bold
                        text-gray-800
                    ">
                        Delete Student?
                    </h2>

                    <p className="
                        text-sm
                        text-gray-500
                        mt-1
                    ">
                        {studentName} will be permanently deleted.
                    </p>

                </div>

                <div className="
                    flex justify-end gap-3
                ">

                    <button
                        onClick={() =>
                            toast.dismiss(t.id)
                        }
                        className="
                            px-4 py-2
                            rounded-xl
                            bg-gray-100
                            hover:bg-gray-200
                            text-gray-700
                            font-medium
                            transition
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={async () => {

                            toast.dismiss(t.id);

                            const loadingToast =
                                toast.loading(
                                    "Deleting student..."
                                );

                            try {

                                const res =
                                    await fetch(
                                        `/api/students?id=${id}`,
                                        {
                                            method: "DELETE",
                                        }
                                    );

                                const data =
                                    await res.json();

                                toast.dismiss(
                                    loadingToast
                                );

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

                                toast.dismiss(
                                    loadingToast
                                );

                                toast.error(
                                    "Something went wrong"
                                );

                            }

                        }}
                        className="
                            px-4 py-2
                            rounded-xl
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            font-semibold
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
                flex items-center
                justify-center

                bg-gradient-to-br
                from-[#021B33]
                via-[#04284B]
                to-[#063B6E]
            ">

                <div className="text-center">

                    <div className="
                        w-24 h-24
                        rounded-full

                        bg-white/10
                        backdrop-blur-xl

                        flex items-center
                        justify-center

                        mx-auto

                        border border-white/10
                    ">

                        <Users
                            size={50}
                            className="
                                text-white
                                animate-pulse
                            "
                        />

                    </div>

                    <h2 className="
                        mt-8
                        text-3xl
                        font-extrabold
                        text-white
                    ">
                        Loading Students
                    </h2>

                </div>

            </div>

        );

    }

    return (

        <div className="
            min-h-screen
            bg-[#F4F7FB]

            p-4
            sm:p-6
        ">

            {/* ================= HEADER ================= */}
            <div className="mb-8">

                <h1 className="
                    text-3xl
                    sm:text-4xl
                    font-extrabold
                    text-gray-800
                ">
                    Students Management
                </h1>

                <p className="
                    text-gray-500
                    mt-2
                ">
                    Manage all schools students professionally.
                </p>

            </div>

            {/* ================= STATS ================= */}
            <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3

                gap-5
                mb-8
            ">

                {/* TOTAL STUDENTS */}
                <div className="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-sm
                    border
                ">

                    <div className="
                        flex items-center
                        justify-between
                    ">

                        <div>

                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                Total Students
                            </p>

                            <h2 className="
                                text-4xl
                                font-extrabold
                                mt-2
                                text-blue-600
                            ">
                                {students.length}
                            </h2>

                        </div>

                        <div className="
                            w-14 h-14
                            rounded-2xl

                            bg-blue-100
                            text-blue-600

                            flex items-center
                            justify-center
                        ">

                            <Users size={28} />

                        </div>

                    </div>

                </div>

                {/* TOTAL SCHOOLS */}
                <div className="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-sm
                    border
                ">

                    <div className="
                        flex items-center
                        justify-between
                    ">

                        <div>

                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                Total Schools
                            </p>

                            <h2 className="
                                text-4xl
                                font-extrabold
                                mt-2
                                text-green-600
                            ">
                                {schools.length}
                            </h2>

                        </div>

                        <div className="
                            w-14 h-14
                            rounded-2xl

                            bg-green-100
                            text-green-600

                            flex items-center
                            justify-center
                        ">

                            <School size={28} />

                        </div>

                    </div>

                </div>

                {/* RESULTS */}
                <div className="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-sm
                    border
                ">

                    <div className="
                        flex items-center
                        justify-between
                    ">

                        <div>

                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                Showing Results
                            </p>

                            <h2 className="
                                text-4xl
                                font-extrabold
                                mt-2
                                text-orange-500
                            ">
                                {filteredStudents.length}
                            </h2>

                        </div>

                        <div className="
                            w-14 h-14
                            rounded-2xl

                            bg-orange-100
                            text-orange-500

                            flex items-center
                            justify-center
                        ">

                            <GraduationCap size={28} />

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= FILTERS ================= */}
            <div className="
                bg-white
                rounded-3xl
                p-4 sm:p-6
                shadow-sm
                border
                mb-8
            ">

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3

                    gap-4
                ">

                    {/* SEARCH */}
                    <div className="relative">

                        <Search
                            size={18}
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-gray-400
                            "
                        />

                        <input
                            type="text"
                            placeholder="Search students..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="
                                w-full

                                pl-11 pr-4 py-3

                                rounded-2xl

                                border border-gray-200

                                outline-none

                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />

                    </div>

                    

                </div>

            </div>

        </div>

    );

}