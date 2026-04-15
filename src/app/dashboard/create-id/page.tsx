"use client";

import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import TemplateRenderer from "@/components/TemplateRenderer";
import BulkUploadPage from "../bulk-upload/page";
import jsPDF from "jspdf";

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

    const formatDate = (date: string) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
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

        // 📏 PVC CARD SIZE (CR80)
        const cardWidth = 52;     // mm
        const cardHeight = 83;  // mm

        // 📐 spacing
        const gapX = 2;
        const gapY = 2;

        const marginX = (pageWidth - (cardWidth * 2 + gapX)) / 2;
        const marginY = (pageHeight - (cardHeight * 3 + gapY * 2)) / 2;

        let count = 0;

        for (let i = 0; i < students.length; i++) {
            const student = students[i];

            // 🔄 render student
            setStudent(student);
            setImage(student.image || null);
            setLogo(student.logo || null);
            setSignature(student.signature || null);

            await new Promise((res) => setTimeout(res, 400));

            if (!cardRef.current) continue;

            const canvas = await html2canvas(cardRef.current, {
                scale: 3,
                useCORS: true,
                width: 300,
                height: 476,
                windowWidth: 300,
                windowHeight: 476,
            });

            const imgData = canvas.toDataURL("image/png");

            // 📍 POSITION
            const col = count % 2;
            const row = Math.floor(count / 2) % 3;

            const x = marginX + col * (cardWidth + gapX);
            const y = marginY + row * (cardHeight + gapY);

            pdf.addImage(imgData, "PNG", x + 1, y + 1, cardWidth, cardHeight);

            // ✂️ OPTIONAL CUTTING BORDER
            pdf.setDrawColor(200);

            count++;

            // 🆕 new page
            if (count % 6 === 0 && i !== students.length - 1) {
                pdf.addPage();
            }
        }

        pdf.save(`${school?.name || "ID"} ID Cards.pdf`);
    };
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Create ID Card</h1>

            {/* FORM */}
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                    <select value={selectedId || ""}
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
                        {Array.isArray(students) && students.map((s) => (
                            <option key={s._id} value={s._id}>
                                {s.name} - Class {s.class}
                            </option>
                        ))}
                    </select>

                    <div><span>School Logo </span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();

                                    reader.onloadend = () => {
                                        setLogo(reader.result as string);
                                    };

                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>

                    <div>
                        <span>Student Image </span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();

                                    reader.onloadend = () => {
                                        setImage(reader.result as string);
                                    };

                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>

                    <div>
                        <span>Principal Signature </span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();

                                    reader.onloadend = () => {
                                        setSignature(reader.result as string);
                                    };

                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Admission No."
                        value={student.admissionNo}
                        onChange={(e) =>
                            setStudent({ ...student, admissionNo: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="text"
                        placeholder="School Name"
                        value={student.school}
                        onChange={(e) =>
                            setStudent({ ...student, school: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="text"
                        placeholder="Student Name"
                        value={student.name}
                        onChange={(e) =>
                            setStudent({ ...student, name: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="text"
                        placeholder="Class"
                        value={student.class}
                        onChange={(e) =>
                            setStudent({ ...student, class: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="text"
                        placeholder="Sec"
                        value={student.sec}
                        onChange={(e) =>
                            setStudent({ ...student, sec: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="text"
                        placeholder="Roll"
                        value={student.roll}
                        onChange={(e) =>
                            setStudent({ ...student, roll: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Father's Name"
                        value={student.father}
                        onChange={(e) =>
                            setStudent({ ...student, father: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Mother's Name"
                        value={student.mother}
                        onChange={(e) =>
                            setStudent({ ...student, mother: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="date"
                        placeholder="D.O.B"
                        value={student.dob}
                        onChange={(e) =>
                            setStudent({ ...student, dob: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={student.address}
                        onChange={(e) =>
                            setStudent({ ...student, address: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Phone No."
                        value={student.phone}
                        onChange={(e) =>
                            setStudent({ ...student, phone: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Blood Group"
                        value={student.blood}
                        onChange={(e) =>
                            setStudent({ ...student, blood: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={async () => {
                                if (!cardRef.current) return;

                                const canvas = await html2canvas(cardRef.current);
                                const link = document.createElement("a");

                                link.download = "id-card.png";
                                link.href = canvas.toDataURL();
                                link.click();
                            }}
                            className="bg-gradient-to-tr from-green-800 to-green-500 text-white px-4 py-2 rounded"
                        >
                            Download ID Card
                        </button>

                        <button
                            onClick={handleSave}
                            className="bg-gradient-to-tr from-blue-900 to-blue-500 text-white px-4 py-2 rounded"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>

                        <button
                            onClick={handleUpdate}
                            className="bg-gradient-to-tr from-yellow-800 to-yellow-500 text-white px-4 py-2 rounded"
                        >
                            {updateloading ? "Updating..." : "Update"}
                        </button>

                        <button
                            onClick={handleDelete}
                            className="bg-gradient-to-tr from-red-800 to-red-500 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                    </div>

                </div>

                {/* PREVIEW */}
                <div>

                    <div >
                        <BulkUploadPage
                            onUploadSuccess={fetchStudents} />
                    </div>

                    <div
                        ref={cardRef}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "300px",
                            height: "476px",
                            background: "white",
                            zIndex: 1, // hide from UI
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

                    <button
                        onClick={handleBulkDownload}
                        className="bg-purple-600 text-white px-4 py-2 rounded"
                    >
                        Download All ID Cards
                    </button>
                </div >
            </div>
        </div >
    );
}