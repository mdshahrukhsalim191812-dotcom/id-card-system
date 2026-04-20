"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BulkUploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [zipFile, setZipFile] = useState<File | null>(null);

    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [processing, setProcessing] = useState(false);

    const [imageProgress, setImageProgress] = useState(0);
    const [totalImages, setTotalImages] = useState(0);

    const [dragActive, setDragActive] = useState(false);
    const [lastFileName, setLastFileName] = useState("");

    const [showImage, setShowImage] = useState(false);

    const xhrRef = useRef<XMLHttpRequest | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const zipRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    // 🔥 RESET
    const resetFiles = () => {
        setFile(null);
        setZipFile(null);
        setLastFileName("");

        if (fileRef.current) fileRef.current.value = "";
        if (zipRef.current) zipRef.current.value = "";
    };

    // 📂 DRAG
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);

        const droppedFile = e.dataTransfer.files[0];
        if (!droppedFile) return;

        if (droppedFile.name === lastFileName) {
            toast.error("Same file already selected ❌");
            return;
        }

        setFile(droppedFile);
        setLastFileName(droppedFile.name);
        toast.success("File selected 👍");
    };

    const formatSize = (size: number) => {
        return (size / 1024 / 1024).toFixed(2) + " MB";
    };

    // 🚀 UPLOAD
    const handleUpload = () => {
        if (!file) {
            toast.error("Select Excel file ❌");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        if (zipFile) formData.append("images", zipFile);

        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr;

        xhr.open("POST", "/api/students/bulk", true);
        xhr.withCredentials = true;

        setUploading(true);
        setProgress(0);
        setProcessing(false);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                setProgress(percent);
            }
        };

        xhr.onload = () => {
            let data: any = {};

            try {
                data = JSON.parse(xhr.responseText);
            } catch { }

            if (xhr.status === 200) {
                setProgress(100);
                setUploading(false);
                setProcessing(true);

                toast.success("Upload successful ✅");

                const total = data.inserted || 10;
                setTotalImages(total);

                let count = 0;

                const interval = setInterval(() => {
                    count++;
                    setImageProgress(count);

                    if (count >= total) {
                        clearInterval(interval);

                        resetFiles();

                        setTimeout(() => {
                            router.push("/dashboard/create-id");
                        }, 800);
                    }
                }, 80);

            } else {
                setUploading(false);
                setProgress(0);
                resetFiles();
                toast.error(data.message || "Upload failed ❌");
            }
        };

        xhr.onerror = () => {
            setUploading(false);
            setProgress(0);
            resetFiles();
            toast.error("Server error ❌");
        };

        xhr.send(formData);
    };

    const handleCancel = () => {
        xhrRef.current?.abort();

        setUploading(false);
        setProcessing(false);
        setProgress(0);

        resetFiles();
        toast("Upload cancelled ❌");
    };

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto">

            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Bulk Upload Students 🚀
            </h1>

            {!uploading && !processing && (
                <div className="grid md:grid-cols-2 gap-6">

                    {/* LEFT GUIDE */}
                    <div className="bg-white p-5 rounded-2xl shadow-md">
                        <p className="font-semibold mb-3 text-gray-700">
                            📌 Excel Format
                        </p>

                        {/* 🔥 IMAGE WITH HOVER + CLICK */}
                        <div
                            onClick={() => setShowImage(true)}
                            className="overflow-hidden rounded-lg cursor-pointer group"
                        >
                            <img
                                src="/excel format.jpeg"
                                alt="Excel Format"
                                className="w-full rounded-lg shadow transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>

                        {/* DOWNLOAD */}
                        <a
                            href="/sample.xlsx"
                            download
                            className="block mt-4 text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            📥 Download Sample
                        </a>
                    </div>

                    {/* RIGHT UPLOAD */}
                    <div className="bg-white p-5 rounded-2xl shadow-md">

                        {/* DRAG AREA */}
                        <div
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragActive(true);
                            }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed p-6 text-center rounded-lg transition ${dragActive
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-300"
                                }`}
                        >
                            Drag & Drop Excel 📂
                        </div>

                        {/* 🔥 EXCEL INPUT */}
                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Excel File
                            </label>

                            <input
                                ref={fileRef}
                                type="file"
                                accept=".xlsx,.xls"
                                onChange={(e) => {
                                    const selected = e.target.files?.[0];
                                    if (!selected) return;

                                    if (selected.name === lastFileName) {
                                        toast.error("Same file ❌");
                                        return;
                                    }

                                    setFile(selected);
                                    setLastFileName(selected.name);
                                }}
                                className="w-full border p-2 rounded-md"
                            />

                            {/* EXCEL PREVIEW */}
                            {file && (
                                <div className="mt-3 bg-gray-100 p-3 rounded flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-semibold">{file.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {formatSize(file.size)}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setFile(null);
                                            setLastFileName("");
                                            if (fileRef.current) fileRef.current.value = "";
                                        }}
                                        className="text-red-500 font-bold text-lg"
                                    >
                                        ✖
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* 🔥 ZIP INPUT */}
                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Images ZIP (Optional)
                            </label>

                            <input
                                ref={zipRef}
                                type="file"
                                accept=".zip"
                                onChange={(e) => {
                                    const selected = e.target.files?.[0];
                                    if (!selected) return;

                                    setZipFile(selected);
                                }}
                                className="w-full border p-2 rounded-md"
                            />

                            {/* ZIP PREVIEW */}
                            {zipFile && (
                                <div className="mt-3 bg-gray-100 p-3 rounded flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-semibold">{zipFile.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {formatSize(zipFile.size)}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setZipFile(null);
                                            if (zipRef.current) zipRef.current.value = "";
                                        }}
                                        className="text-red-500 font-bold text-lg"
                                    >
                                        ✖
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* 🔥 BUTTON */}
                        <button
                            onClick={handleUpload}
                            disabled={!file}
                            className={`w-full mt-5 py-2.5 rounded-lg text-white font-semibold transition ${!file
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            Upload Data
                        </button>
                    </div>
                </div>
            )}

            {/* UPLOADING */}
            {uploading && (
                <div className="text-center mt-10">
                    <p className="font-semibold mb-3">Uploading...</p>

                    <div className="w-full bg-gray-200 h-4 rounded-full">
                        <div
                            className="bg-blue-600 h-4 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <p className="mt-2 text-sm">{progress}%</p>

                    <button
                        onClick={handleCancel}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* PROCESSING */}
            {processing && (
                <div className="text-center mt-10">
                    <p className="font-semibold mb-3">
                        Processing Images...
                    </p>

                    <div className="w-full bg-gray-200 h-4 rounded-full">
                        <div
                            className="bg-green-600 h-4 rounded-full"
                            style={{
                                width: `${(imageProgress / totalImages) * 100}%`,
                            }}
                        />
                    </div>

                    <p className="mt-2 text-sm">
                        {imageProgress}/{totalImages}
                    </p>
                </div>
            )}
            {showImage && (
                <div
                    onClick={() => setShowImage(false)}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                >
                    <img
                        src="/excel format.jpeg"
                        className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl"
                    />
                </div>
            )}
        </div>
    );
}