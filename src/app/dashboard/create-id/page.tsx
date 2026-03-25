"use client";

import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";
import Template3 from "@/components/templates/Template3";
import Template4 from "@/components/templates/Template4";
import Template5 from "@/components/templates/Template5";
import Template6 from "@/components/templates/Template6";

export default function CreateIDPage() {
    const [student, setStudent] = useState({
        school: "",
        tag: "",
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
        name: string;
        class: string;
        roll: string;
        father: string;
        phone: string;
        address: string;
        dob: string;
        school: string;
        blood: string,
        tag: string;
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
    const [template, setTemplate] = useState("1")
    const [loading, setLoading] = useState(false);
    const [updateloading, setUpdateLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);


    const fetchStudents = async () => {
        const res = await fetch("/api/students");
        const data = await res.json();
        setStudents(data);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const cardRef = useRef<HTMLDivElement>(null);

    const formatDate = (date: string) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const handleSave = async () => {
        try {
            if (!student.name || !student.class || !student.roll) {
                toast.error("Fill required fields!");
                return;
            }

            setLoading(true);

            const studentData = {
                ...student,
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

            const data = await res.json();

            if (data.success) {
                toast.success("Saved successfully.");

                setStudent({
                    school: "",
                    tag: "",
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

            const data = await res.json();

            if (data.success) {
                toast.success("Updated successfully ✅");

                setStudent({
                    school: "",
                    tag: "",
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

            const confirmDelete = confirm("Are you sure you want to delete this student?");

            if (!confirmDelete) return;

            const res = await fetch(`/api/students?id=${selectedId}`, {
                method: "DELETE",
                credentials: "include"
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Deleted successfully 🗑️");

                setStudent({
                    school: "",
                    tag: "",
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

                setDeleteLoading(false);
            }
            else {
                toast.error("Delete failed ❌");
            }

        } catch (error) {
            console.error(error);
            toast.error("Error deleting!");
        }
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
                                    tag: selected.tag || "",
                                    name: selected.name || "",
                                    roll: selected.roll || "",
                                    class: selected.class || "",
                                    father: selected.father || "",
                                    mother: "",
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

                    <select
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="1">Design 1</option>
                        <option value="2">Design 2</option>
                        <option value="3">Design 3</option>
                        <option value="4">Design 4</option>
                        <option value="5">Design 5</option>
                        <option value="6">Design 6</option>
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
                        placeholder="School Name"
                        value={student.school}
                        onChange={(e) =>
                            setStudent({ ...student, school: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Tag Line/ School Address"
                        value={student.tag}
                        onChange={(e) =>
                            setStudent({ ...student, tag: e.target.value })
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
                <div className="flex justify-center items-center">
                    <div>
                        {template === "1" && <Template1 student={student} image={image}
                            logo={logo} formatDate={formatDate} />}

                        {template === "2" && < Template2 student={student} image={image} logo={logo} formatDate={formatDate} />}

                        {template === "3" && < Template3 student={student} image={image} logo={logo} formatDate={formatDate} />}

                        {template === "4" && < Template4 student={student} image={image} logo={logo} formatDate={formatDate} signature={signature} />}

                        {template === "5" && < Template5 student={student} image={image} logo={logo} formatDate={formatDate} />}

                        {template === "6" && < Template6 student={student} image={image} logo={logo} formatDate={formatDate} signature={signature} />}
                    </div>
                </div >
            </div>
        </div >
    );
}