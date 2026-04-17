"use client";

import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import TemplateRenderer from "@/components/TemplateRenderer";
import BulkUploadPage from "../bulk-upload/page";
import jsPDF from "jspdf";
import Link from "next/link";

export default function CreateIDPage() {
    const [student, setStudent] = useState({
        school: "",
        admissionNo: "",
        sec: "",
        name: "",
        roll: "",
        class: "",
        father: "",
        mother: "",
        phone: "",
        address: "",
        schoolAddress: "",
        dob: "",
        photo: "",
        blood: ""
    });

    type Student = {
        _id: string;
        admissionNo: string;
        name: string;
        class: string;
        sec: string;
        roll: string;
        father: string;
        mother: string;
        phone: string;
        address: string;
        dob: string;
        school: string;
        blood: string,
        tag: string;
        template?: string;
        image?: string;
        logo?: string;
        signature?: string;
    };

    //const [color, setColor] = useState("blue");
    const [students, setStudents] = useState<Student[]>([]);
    const [image, setImage] = useState<string | null>(null);
    const [logo, setLogo] = useState<string | null>(null);
    const [signature, setSignature] = useState<string | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [updateloading, setUpdateLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [school, setSchool] = useState<any>(null);
    const [form, setForm] = useState<any>(null);

    const templateId = school?.templateId;

    const cardRef = useRef<HTMLDivElement>(null);

    const fetchStudents = async () => {
        try {
            const res = await fetch("/api/students", {
                credentials: "include"
            });

            if (res.status === 401) {
                toast.error("Session expired. Please login again 🔒");

                localStorage.removeItem("schoolId");

                window.location.href = "/login";
                return;
            }

            const data = await res.json();

            if (Array.isArray(data)) {
                setStudents(data);
            } else {
                console.error("Not array:", data);
                setStudents([]); // fallback
                toast.error(data.message || "Failed to fetch students");
            }

        } catch (error) {
            console.error(error);
            setStudents([]);
            toast.error("Fetch error!");
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const formatDate = (date: any) => {
        if (!date) return "-";

        const d = new Date(date);

        if (isNaN(d.getTime())) return "-";

        return d.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                setSchool(data.school);
            });
    }, []);

    useEffect(() => {
        if (school?.name) {
            setStudent((prev) => ({
                ...prev,
                school: school.name
            }));
        }
    }, [school]);

    const handleSave = async () => {
        try {
            if (!student.name || !student.class || !student.roll || !student.father || !student.mother || !student.phone || !student.address || !student.dob || !student.school) {
                toast.error("Fill required fields!");
                return;
            }

            setLoading(true);

            const studentData = {
                ...student,
                template: templateId,
                dob: student.dob ? new Date(student.dob) : null,
                image,
                logo,
                signature
            };

            const res = await fetch("/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(studentData)
            });

            if (res.status === 401) {
                toast.error("Session expired. Please login again 🔒");

                localStorage.removeItem("schoolId");

                window.location.href = "/login";
                return;
            }

            const data = await res.json();

            if (data.success) {
                toast.success("Saved successfully.");

                setStudent({
                    school: "",
                    admissionNo: "",
                    sec: "",
                    name: "",
                    roll: "",
                    class: "",
                    father: "",
                    mother: "",
                    phone: "",
                    address: "",
                    schoolAddress: "",
                    dob: "",
                    photo: "",
                    blood: ""
                });

                setImage(null);
                setLogo(null);
                setSignature(null);

                fetchStudents();
            } else {
                toast.error(data.message || "Error saving!");
            }

        } catch (error) {
            console.error(error);
            toast.error("Error saving!");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            if (!selectedId) {
                toast.error("Select student first!");
                return;
            }

            setUpdateLoading(true);

            const studentData = {
                id: selectedId,
                ...student,
                template: templateId,
                dob: student.dob ? new Date(student.dob) : null,
                image,
                logo,
                signature
            };

            const res = await fetch("/api/students", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(studentData)
            });

            if (res.status === 401) {
                toast.error("Session expired. Please login again 🔒");

                localStorage.removeItem("schoolId");

                window.location.href = "/login";
                return;
            }

            const data = await res.json();

            if (data.success) {
                toast.success("Updated successfully ✅");

                setStudent({
                    school: "",
                    admissionNo: "",
                    sec: "",
                    name: "",
                    roll: "",
                    class: "",
                    father: "",
                    mother: "",
                    phone: "",
                    address: "",
                    schoolAddress: "",
                    dob: "",
                    photo: "",
                    blood: ""
                });

                setImage(null);
                setLogo(null);
                setSignature(null);
                setSelectedId(null);

                fetchStudents();

                setUpdateLoading(false);
            }
            else {
                toast.error("Update failed ❌");
            }

        } catch (error) {
            console.error(error);
            toast.error("Error updating!");
        }
    };

    const handleDelete = async () => {
        try {
            if (!selectedId) {
                toast.error("Select student first!");
                return;
            }

            toast((t) => (
                <div className="flex flex-col gap-3">
                    <p className="font-semibold text-black ">
                        <span>⚠️</span>
                        <span> Delete this student? </span>
                    </p>

                    <div className="flex gap-2 justify-end">
                        {/* YES */}
                        <button
                            onClick={async () => {
                                toast.dismiss(t.id);

                                try {
                                    const res = await fetch(`/api/students?id=${selectedId}`, {
                                        method: "DELETE",
                                        credentials: "include",
                                    });

                                    const data = await res.json();

                                    if (data.success) {
                                        toast.success("Deleted successfully 🗑️");

                                        setStudent({
                                            school: school?.name || "",
                                            admissionNo: "",
                                            sec: "",
                                            name: "",
                                            roll: "",
                                            class: "",
                                            father: "",
                                            mother: "",
                                            phone: "",
                                            address: "",
                                            schoolAddress: "",
                                            dob: "",
                                            photo: "",
                                            blood: ""
                                        });

                                        setImage(null);
                                        setLogo(null);
                                        setSignature(null);
                                        setSelectedId("");

                                        await fetchStudents();

                                    } else {
                                        toast.error(data.message || "Delete failed ❌");
                                    }

                                } catch (error) {
                                    console.error(error);
                                    toast.error("Error deleting ❌");
                                }
                            }}
                            className="bg-red-500 hover:bg-red-800 text-white px-3 py-1 rounded"
                        >
                            Yes
                        </button>

                        {/* CANCEL */}
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ));

        } catch (error) {
            console.error(error);
            toast.error("Error deleting!");
        }
    };

    const handleBulkDownload = async () => {
        if (!students.length) return;

        const pdf = new jsPDF("p", "mm", "a4");

        // 📄 A4 size
        const pageWidth = 210;
        const pageHeight = 297;

        // 🪪 PVC card size
        const cardWidth = 52;
        const cardHeight = 83;

        // 🔥 spacing (increase/decrease if needed)
        const gapX = 6;
        const gapY = 6;

        // ✅ CENTER ALIGN CALCULATION
        const totalRowWidth = cardWidth * 3 + gapX * 2;
        const marginX = (pageWidth - totalRowWidth) / 2;

        const marginY = 10;

        let count = 0;

        for (let i = 0; i < students.length; i++) {
            const student = students[i];

            // 🔄 render student
            setStudent(student);
            setImage(student.image || null);
            setLogo(student.logo || null);
            setSignature(student.signature || null);

            // ⏳ wait for render
            await new Promise((res) => setTimeout(res, 400));

            if (!cardRef.current) continue;

            // 📸 capture card
            const canvas = await html2canvas(cardRef.current, {
                scale: 3,
                useCORS: true,
                width: 300,
                height: 476,
                windowWidth: 300,
                windowHeight: 476,
            });

            const imgData = canvas.toDataURL("image/png");

            // 📍 POSITION (3x3 GRID)
            const col = count % 3;
            const row = Math.floor(count / 3) % 3;

            const x = marginX + col * (cardWidth + gapX);
            const y = marginY + row * (cardHeight + gapY);

            // 🖼️ add to pdf
            pdf.addImage(imgData, "PNG", x, y, cardWidth, cardHeight);

            // ✂️ OPTIONAL BORDER (for cutting guide)
            pdf.setDrawColor(200);
            pdf.rect(x, y, cardWidth, cardHeight);

            count++;

            // 📄 NEW PAGE AFTER 9 CARDS
            if (count % 9 === 0 && i !== students.length - 1) {
                pdf.addPage();
            }
        }

        // 💾 SAVE FILE
        pdf.save(`${school?.name || "ID"} ID Cards.pdf`);
    };

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
                Create ID Card
            </h1>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 🔥 LEFT SIDE (FORM) */}
                <div className="space-y-4">

                    {/* SELECT */}
                    <select
                        value={selectedId || ""}
                        className="w-full border p-2 rounded"
                        onChange={(e) => {
                            const selected = students.find(s => s._id === e.target.value);

                            if (selected) {
                                setSelectedId(selected._id);

                                setStudent({
                                    school: selected.school || "",
                                    admissionNo: selected.admissionNo || "",
                                    sec: selected.sec || "",
                                    name: selected.name || "",
                                    roll: selected.roll || "",
                                    class: selected.class || "",
                                    father: selected.father || "",
                                    mother: selected.mother || "",
                                    phone: selected.phone || "",
                                    address: selected.address || "",
                                    schoolAddress: "",
                                    dob: selected.dob || "",
                                    photo: "",
                                    blood: selected.blood || ""
                                });

                                setImage(selected.image || null);
                                setLogo(selected.logo || null);
                                setSignature(selected.signature || null);
                            }
                        }}
                    >
                        <option>Select Student</option>
                        {students.map((s) => (
                            <option key={s._id} value={s._id}>
                                {s.name} - Class {s.class}
                            </option>
                        ))}
                    </select>

                    {/* FILE INPUTS */}
                    <div>
                        <p className="font-medium">School Logo</p>
                        <input type="file" accept="image/*" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => setLogo(reader.result as string);
                                reader.readAsDataURL(file);
                            }
                        }} />
                    </div>

                    <div>
                        <p className="font-medium">Student Image</p>
                        <input type="file" accept="image/*" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => setImage(reader.result as string);
                                reader.readAsDataURL(file);
                            }
                        }} />
                    </div>

                    <div>
                        <p className="font-medium">Principal Signature</p>
                        <input type="file" accept="image/*" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => setSignature(reader.result as string);
                                reader.readAsDataURL(file);
                            }
                        }} />
                    </div>

                    {/* INPUTS */}
                    {[
                        { key: "admissionNo", placeholder: "Admission No." },
                        { key: "school", placeholder: "School Name" },
                        { key: "name", placeholder: "Student Name" },
                        { key: "class", placeholder: "Class" },
                        { key: "sec", placeholder: "Section" },
                        { key: "roll", placeholder: "Roll" },
                        { key: "father", placeholder: "Father Name" },
                        { key: "mother", placeholder: "Mother Name" },
                        { key: "phone", placeholder: "Phone" },
                        { key: "address", placeholder: "Address" },
                        { key: "blood", placeholder: "Blood Group" }
                    ].map((field) => (
                        <input
                            key={field.key}
                            type="text"
                            placeholder={field.placeholder}
                            value={(student as any)[field.key]}
                            onChange={(e) =>
                                setStudent({ ...student, [field.key]: e.target.value })
                            }
                            className="w-full border p-2 rounded"
                        />
                    ))}

                    {/* DOB */}
                    <input
                        type="date"
                        value={student.dob}
                        onChange={(e) =>
                            setStudent({ ...student, dob: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    {/* 🔥 BUTTONS */}
                    <div className="flex flex-wrap gap-3 mt-4">

                        <button
                            onClick={async () => {
                                if (!cardRef.current) return;
                                const canvas = await html2canvas(cardRef.current);
                                const link = document.createElement("a");
                                link.download = "id-card.png";
                                link.href = canvas.toDataURL();
                                link.click();
                            }}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Download
                        </button>

                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>

                        <button
                            onClick={handleUpdate}
                            className="bg-yellow-600 text-white px-4 py-2 rounded"
                        >
                            {updateloading ? "Updating..." : "Update"}
                        </button>

                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                {/* 🔥 RIGHT SIDE (PREVIEW) */}
                <div className="flex flex-col items-center md:items-start">

                    {/* BUTTONS */}
                    <div className="flex flex-wrap gap-3 mb-4 justify-center md:justify-start">
                        <Link href="/dashboard/bulk-upload">
                            <button className="bg-purple-600 text-white px-4 py-2 rounded">
                                Bulk Upload
                            </button>
                        </Link>

                        <button
                            onClick={handleBulkDownload}
                            className="bg-purple-600 text-white px-4 py-2 rounded"
                        >
                            Download All
                        </button>
                    </div>

                    {/* CARD */}
                    <div
                        ref={cardRef}
                        className="border shadow-md overflow-hidden mx-auto md:mx-0"
                        style={{
                            width: "300px",
                            height: "476px",
                        }}
                    >
                        <TemplateRenderer
                            templateId={templateId}
                            student={student}
                            image={image}
                            logo={logo}
                            signature={signature}
                            formatDate={formatDate}
                            school={school}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}