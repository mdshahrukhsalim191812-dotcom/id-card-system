"use client";

import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import TemplateRenderer from "@/components/TemplateRenderer";
import BulkUploadPage from "../bulk-upload/page";
import jsPDF from "jspdf";
import Link from "next/link";
import { getCroppedImg } from "@/lib/cropImage";
import ImageCropper from "@/components/ImageCropper";
import * as faceapi from "face-api.js";
import { removeBackground } from "@/lib/removeBg";
import { addWhiteBackground } from "@/lib/addWhiteBg";

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
    const [loadingPage, setLoadingPage] = useState(true);
    const [modelsLoaded, setModelsLoaded] = useState(false);

    const templateId = school?.templateId;

    const cardRef = useRef<HTMLDivElement>(null);

    const [cameraOn, setCameraOn] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const fetchStudents = async () => {
        try {
            setLoadingPage(true); // 🔥 START LOADING

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
                setStudents([]);
                toast.error(data.message || "Failed to fetch students");
            }

        } catch (error) {
            console.error(error);
            setStudents([]);
            toast.error("Fetch error!");
        } finally {
            setLoadingPage(false); // 🔥 STOP LOADING
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

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = "/models";

            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);

            setModelsLoaded(true); // 🔥 IMPORTANT
        };

        loadModels();
    }, []);

    const startCamera = async () => {
        try {
            setCameraOn(true); // 🔥 FIRST render video

            // wait for video to mount
            setTimeout(async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: true,
                    });

                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        await videoRef.current.play();
                    }

                } catch (err) {
                    console.error(err);
                    alert("Camera not accessible ❌");
                }
            }, 300); // small delay

        } catch (err) {
            console.error(err);
        }
    };

    const capturePhoto = async () => {
        if (!videoRef.current) return;

        const video = videoRef.current;

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(video, 0, 0);

        const rawImage = canvas.toDataURL("image/jpeg");

        // 🔥 APPLY AI CROP HERE
        const cropped = await autoCropFace(rawImage);

        const noBg = await removeBackground(cropped);

        const finalImage = await addWhiteBackground(noBg);

        setImage(finalImage);

        stopCamera();
    };

    const stopCamera = () => {
        if (!videoRef.current) return;

        const stream = videoRef.current.srcObject as MediaStream | null;

        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }

        setCameraOn(false);
    };

    const autoCropFace = async (imageSrc: string) => {
        if (!modelsLoaded) {
            toast.error("AI loading... please wait ⏳");
            return imageSrc;
        }

        const img = new Image();
        img.src = imageSrc;

        await new Promise((res) => (img.onload = res));

        const detection = await faceapi
            .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks();

        if (!detection) {
            toast.error("No face detected! 🙁");
            return imageSrc;
        }

        const { x, y, width, height } = detection.detection.box;

        const padding = 0.6;

        const cropX = Math.max(0, x - width * padding);
        const cropY = Math.max(0, y - height * padding);

        const cropW = Math.min(img.width - cropX, width * (1 + padding * 2));
        const cropH = Math.min(img.height - cropY, height * (1 + padding * 2));

        const canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 400;

        const ctx = canvas.getContext("2d");

        ctx?.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, 300, 400);

        return canvas.toDataURL("image/jpeg", 0.9);
    };

    const removeBackground = async (base64Image: string) => {
        const blob = await fetch(base64Image).then(res => res.blob());

        const formData = new FormData();
        formData.append("file", blob);

        const res = await fetch("/api/remove-bg", {
            method: "POST",
            body: formData,
        });

        const resultBlob = await res.blob();

        return await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(resultBlob);
        });
    };

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

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [300, 476],
        });

        for (let i = 0; i < students.length; i++) {
            const student = students[i];

            setStudent(student);
            setImage(student.image || null);
            setLogo(student.logo || null);
            setSignature(student.signature || null);

            await new Promise((res) => setTimeout(res, 300));

            const canvas = await html2canvas(cardRef.current, {
                scale: 1, // 🔥 CRITICAL FIX
                useCORS: true,
                width: 300,
                height: 476,
            });

            const imgData = canvas.toDataURL("image/png");

            if (i !== 0) pdf.addPage();

            pdf.addImage(imgData, "PNG", 0, 0, 300, 476);
        }

        pdf.save(`${school?.name || "ID"}.pdf`);
    };

    if (loadingPage) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-[#021B33] via-[#063B6E] to-blue-500 flex flex-col items-center justify-center text-white z-50">

                <h1 className="text-2xl font-bold mb-4">
                    <img className="w-[90px] h-[90px]" src="/genix-logo.png" alt="logo" />
                </h1>

                <div className="w-[40px] h-[40px] border-4 border-white border-t-transparent rounded-full animate-spin">

                </div>

                <p className="mt-4 text-[20px] opacity-80">
                    Loading your creation...
                </p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
                Create ID Card
            </h1>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 🔥 LEFT SIDE */}
                <div className="space-y-4 bg-white p-4 rounded-xl shadow">

                    {/* SELECT */}
                    <select
                        value={selectedId || ""}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                        <p className="font-medium mb-1">School Logo</p>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border border-gray-300 p-2 rounded-md hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => setLogo(reader.result as string);
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>

                    {/* 🔥 STUDENT IMAGE (UPLOAD + CAMERA) */}
                    <div>
                        <p className="font-medium mb-1">Student Image</p>

                        {/* Upload */}
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border border-gray-300 p-2 rounded-md hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition mb-2"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = async () => {
                                        const rawImage = reader.result as string;

                                        const cropped = await autoCropFace(rawImage);

                                        const noBg = await removeBackground(cropped);

                                        const finalImage = await addWhiteBackground(noBg);

                                        setImage(finalImage);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />

                        {/* Camera Button */}
                        <button
                            onClick={startCamera}
                            disabled={!modelsLoaded}
                            className={`px-3 py-1 rounded shadow transition mb-2 
                            ${modelsLoaded
                                    ? "bg-blue-600 hover:brightness-110 text-white"
                                    : "bg-gray-400 text-white cursor-not-allowed"}`}
                        >
                            {modelsLoaded ? "📸 Click Photo" : "⏳ Loading AI..."}
                        </button>

                        {/* Camera Preview */}
                        {cameraOn && (
                            <div className="mt-2 space-y-2">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full rounded border shadow"
                                />

                                {cameraOn && (
                                    <button
                                        onClick={capturePhoto}
                                        className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg"
                                    >
                                        Capture Photo
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Hidden Canvas */}
                        <canvas ref={canvasRef} className="hidden" />

                        {/* Preview Image */}
                        {image && (
                            <img
                                src={image}
                                alt="Preview"
                                className="mt-2 w-24 h-32 object-cover rounded border"
                            />
                        )}
                    </div>

                    <div>
                        <p className="font-medium mb-1">Principal Signature</p>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border border-gray-300 p-2 rounded-md hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => setSignature(reader.result as string);
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
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
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    ))}

                    {/* DOB */}
                    <input
                        type="date"
                        value={student.dob}
                        onChange={(e) =>
                            setStudent({ ...student, dob: e.target.value })
                        }
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 transition"
                    />

                    {/* 🔥 BUTTONS */}
                    <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-center">

                        {/* DOWNLOAD */}
                        <button
                            onClick={async () => {
                                if (!cardRef.current) return;

                                // 🔥 wait for layout to settle
                                await new Promise((res) => setTimeout(res, 300));

                                const canvas = await html2canvas(cardRef.current, {
                                    scale: 3,
                                    useCORS: true,
                                    width: 300,
                                    height: 476,
                                    windowWidth: 300,
                                    windowHeight: 476,
                                });

                                const link = document.createElement("a");
                                link.download = "id-card.png";
                                link.href = canvas.toDataURL();
                                link.click();
                            }}
                            className="bg-gradient-to-r from-green-800 to-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200"
                        >
                            Download
                        </button>

                        {/* SAVE */}
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="
                            bg-gradient-to-r from-blue-900 to-blue-500 text-white 
                            px-3 py-1.5 text-sm rounded-md 
                            sm:px-4 sm:py-2 sm:text-base sm:rounded-lg
                            shadow-md hover:shadow-lg hover:brightness-110 
                            active:scale-95 transition-all duration-200 
                            disabled:opacity-50
                            "
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>

                        {/* UPDATE */}
                        <button
                            onClick={handleUpdate}
                            disabled={updateloading}
                            className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 disabled:opacity-50"
                        >
                            {updateloading ? "Updating..." : "Update"}
                        </button>

                        {/* DELETE */}
                        <button
                            onClick={handleDelete}
                            className="bg-gradient-to-r from-red-800 to-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                {/* 🔥 RIGHT SIDE */}
                <div className="flex flex-col items-center md:items-start">

                    {/* BUTTONS */}
                    <div className="flex flex-wrap gap-3 mb-4 justify-center md:justify-start">

                        <Link href="/dashboard/bulk-upload">
                            <button className="bg-gradient-to-r from-purple-900 to-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all">
                                Bulk Upload
                            </button>
                        </Link>

                        <button
                            onClick={handleBulkDownload}
                            className="bg-gradient-to-r from-purple-900 to-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all"
                        >
                            Download All
                        </button>
                    </div>

                    {/* CARD */}
                    <div
                        ref={cardRef}
                        className="border shadow-xl overflow-hidden md:mx-0 hover:shadow-2xl transition duration-300"
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