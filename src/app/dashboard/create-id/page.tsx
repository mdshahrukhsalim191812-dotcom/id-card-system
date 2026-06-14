"use client";

import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import TemplateRenderer from "@/components/TemplateRenderer";
import Link from "next/link";
import { FileBadge2, LoaderCircle, CreditCard, Users, Upload, ArrowRight, LayoutDashboard } from "lucide-react";

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
        blood: string;
        tag: string;
        template?: string;
        image?: string;
        logo?: string;
        signature?: string;
    };

    const [students, setStudents] = useState<Student[]>([]);
    const [image, setImage] = useState<string | null>(null);
    const [logo, setLogo] = useState<string | null>(null);
    const [signature, setSignature] = useState<string | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [updateloading, setUpdateLoading] = useState(false);
    const [school, setSchool] = useState<any>(null);
    const [loadingPage, setLoadingPage] = useState(true);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const templateId = school?.templateId;

    const cardRef = useRef<HTMLDivElement>(null);
    const faceapiRef = useRef<any>(null);

    const [cameraOn, setCameraOn] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const fetchStudents = async () => {
        try {
            setLoadingPage(true);

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

            if (data.success && Array.isArray(data.data)) {
                setStudents(data.data);
            } else {
                console.error("INVALID STUDENT DATA:", data);
                setStudents([]);
            }

        } catch (error) {
            console.error("FETCH STUDENTS ERROR:", error);
            if (students.length === 0) {
                toast.error("Failed to fetch students");
            }
        } finally {
            setLoadingPage(false);
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

    // Load FaceAPI Models for face detection only
    useEffect(() => {
        const loadModels = async () => {
            try {
                const faceapi = await import("face-api.js");
                faceapiRef.current = faceapi;
                const MODEL_URL = "/models";
                await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
                await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
                setModelsLoaded(true);
                console.log("Face detection models loaded ✅");
            } catch (error) {
                console.error("AI MODEL LOAD ERROR:", error);
                toast.error("Face detection models failed to load ❌");
            }
        };
        loadModels();
    }, []);

    useEffect(() => {
        const selectedStudent = sessionStorage.getItem("selectedStudent");
        if (!selectedStudent) return;

        const data = JSON.parse(selectedStudent);
        console.log("Selected Student:", data);

        setSelectedId(data._id);
        setStudent({
            school: data.school || "",
            admissionNo: data.admissionNo || "",
            sec: data.sec || "",
            name: data.name || "",
            roll: data.roll || "",
            class: data.class || "",
            father: data.father || "",
            mother: data.mother || "",
            phone: data.phone || "",
            address: data.address || "",
            schoolAddress: "",
            dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
            photo: "",
            blood: data.blood || ""
        });
        setImage(data.image || null);
        setLogo(data.logo || null);
        setSignature(data.signature || null);
    }, []);

    const startCamera = async () => {
        try {
            setCameraOn(true);
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
                    toast.error("Camera not accessible ❌");
                }
            }, 300);
        } catch (err) {
            console.error(err);
        }
    };

    // Face auto-crop function (no background removal)
    const autoCropFace = async (imageSrc: string) => {
        try {
            if (!modelsLoaded) {
                toast.error("Face detection still loading ⏳");
                return imageSrc;
            }

            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = imageSrc;
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            const detection = await faceapiRef.current
                .detectSingleFace(
                    img,
                    new faceapiRef.current.TinyFaceDetectorOptions({
                        inputSize: 320,
                        scoreThreshold: 0.5,
                    })
                )
                .withFaceLandmarks();

            if (!detection) {
                toast.error("Face not detected. Please try again with better lighting ❌");
                return imageSrc;
            }

            const { x, y, width, height } = detection.detection.box;
            const padding = 0.5; // 50% padding around the face

            const cropX = Math.max(0, x - width * padding);
            const cropY = Math.max(0, y - height * padding);
            const cropW = Math.min(img.width - cropX, width * (1 + padding * 2));
            const cropH = Math.min(img.height - cropY, height * (1 + padding * 2));

            const canvas = document.createElement("canvas");
            canvas.width = 600;
            canvas.height = 740;

            const ctx = canvas.getContext("2d");
            if (!ctx) return imageSrc;

            ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, 600, 740);

            toast.success("Face detected and cropped successfully ✅");
            return canvas.toDataURL("image/png", 1);

        } catch (error) {
            console.error("AUTO CROP ERROR:", error);
            toast.error("Face cropping failed ❌");
            return imageSrc;
        }
    };

    const capturePhoto = async () => {
        try {
            if (!videoRef.current) return;

            toast.loading("Detecting face...", {
                id: "face-detection",
            });

            const video = videoRef.current;
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.drawImage(video, 0, 0);
            const rawImage = canvas.toDataURL("image/jpeg");

            // Auto-crop face (no background removal)
            const croppedImage = await autoCropFace(rawImage);
            setImage(croppedImage);
            stopCamera();

            toast.success("Photo captured and face cropped ✅", {
                id: "face-detection",
            });
        } catch (error) {
            console.error(error);
            toast.error("Camera capture failed ❌", {
                id: "face-detection",
            });
        }
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

            const originalStudent = students.find((s) => s._id === selectedId);

            if (!originalStudent) {
                toast.error("Student not found");
                return;
            }

            const nothingChanged =
                originalStudent.school === student.school &&
                originalStudent.admissionNo === student.admissionNo &&
                originalStudent.sec === student.sec &&
                originalStudent.name === student.name &&
                originalStudent.roll === student.roll &&
                originalStudent.class === student.class &&
                originalStudent.father === student.father &&
                originalStudent.mother === student.mother &&
                originalStudent.phone === student.phone &&
                originalStudent.address === student.address &&
                originalStudent.blood === student.blood &&
                new Date(originalStudent.dob).toISOString().split("T")[0] ===
                new Date(student.dob).toISOString().split("T")[0] &&
                (originalStudent.image || "") === (image || "") &&
                (originalStudent.logo || "") === (logo || "") &&
                (originalStudent.signature || "") === (signature || "");

            if (nothingChanged) {
                toast("Nothing changed ⚠️");
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
                setSelectedId(null);
                await fetchStudents();
            } else {
                toast.error(data.message || "Update failed ❌");
            }

        } catch (error) {
            console.error(error);
            toast.error("Error updating!");
        } finally {
            setUpdateLoading(false);
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
                    <p className="font-semibold text-black">
                        <span>⚠️</span>
                        <span> Delete this student? </span>
                    </p>

                    <div className="flex gap-2 justify-end">
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

    if (loadingPage) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-[#021B33] via-[#04284B] to-[#063B6E] flex items-center justify-center overflow-hidden z-[999]">
                <div className="absolute w-[350px] h-[350px] bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-blue-400 blur-2xl opacity-40 animate-pulse"></div>
                        <div className="relative w-28 h-28 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl">
                            <div className="relative w-fit mx-auto">
                                <div className="absolute inset-0 bg-cyan-400/30 blur-3xl rounded-full animate-pulse" />
                                <div className="relative w-28 h-28 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shadow-2xl">
                                    <FileBadge2 size={52} className="text-white" />
                                    <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg">
                                        <LoaderCircle size={22} className="text-white animate-spin" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex gap-3">
                        <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
                        <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                    <h2 className="mt-8 text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
                        Loading Creation
                    </h2>
                    <p className="mt-3 text-blue-100 text-center text-sm sm:text-base max-w-md leading-relaxed">
                        Please wait while we prepare your creation.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* ================= PAGE HEADER ================= */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#021B33] via-[#04284B] to-[#063B6E] text-white mt-[80px]">
                <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-cyan-400/10 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full"></div>
                <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/10 flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.35)] shrink-0">
                                <CreditCard size={34} />
                            </div>
                            <div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                                    Create ID Cards
                                </h1>
                                <p className="mt-3 text-blue-100 text-sm sm:text-base max-w-2xl leading-relaxed">
                                    Welcome! Create Id Cards. Fill in the details, upload a photo, and generate professional ID cards in seconds.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                            <Link href="/dashboard/students" className="group flex items-center justify-center gap-2 bg-white text-[#021B33] hover:bg-blue-50 font-semibold px-5 py-3 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] w-full h-[50px] sm:w-auto">
                                <Users size={18} />
                                Students
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                            </Link>

                            <Link href="/dashboard" className="group flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] text-white font-semibold px-5 py-3 rounded-2xl shadow-[0_10px_40px_rgba(34,211,238,0.35)] transition-all duration-300 w-full h-[50px] sm:w-auto">
                                <LayoutDashboard size={20} />
                                Dashboard
                            </Link>

                            <Link href="/dashboard/bulk-upload" className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[52px] px-5 sm:px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-700 to-purple-500 text-white font-semibold text-sm sm:text-base whitespace-nowrap shadow-[0_10px_30px_rgba(168,85,247,0.35)] hover:scale-[1.03] hover:shadow-purple-500/40 hover:brightness-110 active:scale-95 transition-all duration-300">
                                <Upload size={18} className="shrink-0 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                <span className="leading-none">Bulk Upload</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[20px]">
                {/* LEFT SIDE */}
                <div className="space-y-4 bg-white p-4 rounded-xl shadow">
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

                    {/* STUDENT IMAGE (UPLOAD + CAMERA WITH FACE DETECTION) */}
                    <div>
                        <p className="font-medium mb-1">Student Image</p>

                        {/* Upload with Face Auto-Crop */}
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border border-gray-300 p-2 rounded-md hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition mb-2"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = async () => {
                                        toast.loading("Detecting face...", {
                                            id: "face-detection-upload",
                                        });
                                        const rawImage = reader.result as string;
                                        const croppedImage = await autoCropFace(rawImage);
                                        setImage(croppedImage);
                                        toast.success("Face detected and cropped ✅", {
                                            id: "face-detection-upload",
                                        });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />

                        {/* Camera Button */}
                        <button
                            onClick={startCamera}
                            disabled={!modelsLoaded}
                            className={`px-3 py-1 rounded shadow transition mb-2 ${modelsLoaded
                                    ? "bg-blue-600 hover:brightness-110 text-white"
                                    : "bg-gray-400 text-white cursor-not-allowed"
                                }`}
                        >
                            {modelsLoaded ? "📸 Take Photo (Auto Face Crop)" : "⏳ Loading Face Detection..."}
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
                                        Capture & Auto-Crop Face
                                    </button>
                                )}
                            </div>
                        )}

                        <canvas ref={canvasRef} className="hidden" />

                        {/* Preview Image */}
                        {image && (
                            <div className="mt-2">
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="w-24 h-32 object-cover rounded border"
                                />
                                <p className="text-xs text-green-600 mt-1">✓ Face cropped</p>
                            </div>
                        )}
                    </div>

                    {/* INPUTS */}
                    {[
                        { key: "admissionNo", placeholder: "Admission No." },
                        { key: "name", placeholder: "Student Name" },
                        { key: "class", placeholder: "Class" },
                        { key: "sec", placeholder: "Section" },
                        { key: "roll", placeholder: "Roll" },
                        { key: "father", placeholder: "Father Name" },
                        { key: "mother", placeholder: "Mother Name" },
                        { key: "phone", placeholder: "Phone" },
                        { key: "address", placeholder: "Address" },
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

                    {/* BUTTONS */}
                    <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-center">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="relative overflow-hidden group bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-4 py-2 text-sm rounded-lg sm:px-6 sm:py-2.5 sm:text-base sm:rounded-xl shadow-md hover:shadow-xl active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed font-semibold min-w-[100px] flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                    </svg>
                                    <span>Save</span>
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleUpdate}
                            disabled={updateloading}
                            className="relative overflow-hidden group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 text-sm rounded-lg sm:px-6 sm:py-2.5 sm:text-base sm:rounded-xl shadow-md hover:shadow-xl active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed font-semibold min-w-[100px] flex items-center justify-center gap-2"
                        >
                            {updateloading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Updating...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span>Update</span>
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleDelete}
                            className="relative overflow-hidden group bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 text-sm rounded-lg sm:px-6 sm:py-2.5 sm:text-base sm:rounded-xl shadow-md hover:shadow-xl active:scale-95 transition-all duration-300 font-semibold min-w-[100px] flex items-center justify-center gap-2 hover:from-red-700 hover:to-red-600"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Delete</span>
                            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        </button>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col items-center md:items-start">
                    <div
                        ref={cardRef}
                        className="border shadow-xl overflow-hidden md:mx-0 hover:shadow-2xl transition duration-300"
                        style={{
                            width: "300px",
                            height: "476px",
                        }}
                    >
                        {school ? (
                            <TemplateRenderer
                                key={school.templateId}
                                templateId={school.templateId}
                                student={student}
                                image={image}
                                logo={logo}
                                signature={signature}
                                formatDate={formatDate}
                                school={school}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white">
                                Loading ID Card Template...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}