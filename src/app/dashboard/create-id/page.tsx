"use client";

import Student from "@/models/Student";
import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

export default function CreateIDPage() {
    const [student, setStudent] = useState({
        name: "",
        roll: "",
        class: "",
        father: "",
        mother: "",
        phone: "",
        address: "",
        dob: "",
        photo: ""
    });

    type Student = {
        _id: string;
        name: string;
        class: string;
        roll: string;
    };

    const [color, setColor] = useState("blue");
    const [students, setStudents] = useState<Student[]>([]);
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchStudents = async () => {
            const res = await fetch("/api/students");
            const data = await res.json();
            setStudents(data);
        };

        fetchStudents();
    }, []);

    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Create ID Card</h1>

            {/* FORM */}
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                    <select
                        className="w-full border p-2 rounded"
                        onChange={(e) => {
                            const selected = students.find(s => s._id === e.target.value);
                            if (selected) setStudent(selected);
                        }}
                    >
                        <option>Select Student</option>
                        {students.map((s) => (
                            <option key={s._id} value={s._id}>
                                {s.name} - Class {s.class}
                            </option>
                        ))}
                    </select>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const url = URL.createObjectURL(file);
                                setImage(url);
                            }
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Name"
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

                    {/* Color Picker */}
                    <select
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                    </select>

                    <button
                        onClick={async () => {
                            if (!cardRef.current) return;

                            const canvas = await html2canvas(cardRef.current);
                            const link = document.createElement("a");

                            link.download = "id-card.png";
                            link.href = canvas.toDataURL();
                            link.click();
                        }}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Download ID Card
                    </button>
                </div>

                {/* PREVIEW */}
                <div className="flex justify-center items-center">
                    <div ref={cardRef} className="w-64 h-96 bg-white shadow-xl rounded-xl overflow-hidden border">

                        {/* Header */}
                        <div
                            className={`p-4 text-white text-center ${color === "blue"
                                ? "bg-blue-600"
                                : color === "red"
                                    ? "bg-red-600"
                                    : "bg-green-600"
                                }`}
                        >
                            <h2 className="font-bold">School Name</h2>
                            <p className="text-sm">Student ID Card</p>
                        </div>

                        {/* Body */}
                        <div className="p-4 text-center">
                            <div className="w-24 h-24 mx-auto rounded-full mb-3 overflow-hidden">
                                {image ? (
                                    <img src={image} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-200"></div>
                                )}
                            </div>

                            <h3 className="font-bold text-lg">{student.name || "Name"}</h3>
                            <p>Class: {student.class || "--"}</p>
                            <p>Roll: {student.roll || "--"}</p>
                        </div>

                        {/* Footer */}
                        <div className="p-2 text-center text-xs bg-gray-100">
                            Valid ID Card
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}