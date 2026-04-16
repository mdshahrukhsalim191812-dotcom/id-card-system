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

    const xhrRef = useRef<XMLHttpRequest | null>(null);

    const fileRef = useRef<HTMLInputElement>(null);
    const zipRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

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

        // 🔥 Upload progress
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
            } catch {
                data = {};
            }

            if (xhr.status === 200) {
                setProgress(100);

                // 🔥 START PROCESSING UI
                setUploading(false);
                setProcessing(true);

                // simulate image processing (UX purpose)
                const total = data.inserted || 10;
                setTotalImages(total);

                let count = 0;

                const interval = setInterval(() => {
                    count++;
                    setImageProgress(count);

                    if (count >= total) {
                        clearInterval(interval);

                        setTimeout(() => {
                            router.push("/dashboard/create-id");
                        }, 800);
                    }
                }, 80); // speed of animation

            } else {
                setUploading(false);
                setProgress(0);
                toast.error(data.message || "Upload failed ❌");
            }
        };

        xhr.onerror = () => {
            setUploading(false);
            setProgress(0);
            toast.error("Server error ❌");
        };

        xhr.send(formData);
    };

    // ❌ Cancel Upload
    const handleCancel = () => {
        if (xhrRef.current) {
            xhrRef.current.abort();
        }

        setUploading(false);
        setProcessing(false);
        setProgress(0);

        toast("Upload cancelled ❌");
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Bulk Upload Students
            </h1>

            {/* FORM */}
            {!uploading && !processing && (
                <>
                    <div className="mb-4">
                        <label className="font-semibold">Excel File</label>
                        <input
                            ref={fileRef}
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={(e) =>
                                setFile(e.target.files?.[0] || null)
                            }
                            className="border p-2 w-full rounded mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="font-semibold">Images ZIP</label>
                        <input
                            ref={zipRef}
                            type="file"
                            accept=".zip"
                            onChange={(e) =>
                                setZipFile(e.target.files?.[0] || null)
                            }
                            className="border p-2 w-full rounded mt-1"
                        />
                    </div>

                    <button
                        onClick={handleUpload}
                        disabled={!file}
                        className={`w-full py-2 rounded text-white font-semibold ${!file
                                ? "bg-gray-400"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        Upload Data
                    </button>
                </>
            )}

            {/* 🔥 UPLOADING UI */}
            {uploading && (
                <div className="mt-10 text-center">
                    <p className="text-lg font-semibold mb-4">
                        Uploading Files...
                    </p>

                    <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                        <div
                            className="bg-blue-600 h-5 transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <p className="mt-3 text-sm">{progress}% uploaded</p>

                    {/* ❌ Cancel Button */}
                    <button
                        onClick={handleCancel}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Cancel Upload
                    </button>
                </div>
            )}

            {/* 🔥 PROCESSING UI */}
            {processing && (
                <div className="mt-10 text-center">
                    <p className="text-lg font-semibold mb-4">
                        Processing Excel & Images...
                    </p>

                    <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                        <div
                            className="bg-green-600 h-5 transition-all"
                            style={{
                                width: `${(imageProgress / totalImages) * 100
                                    }%`,
                            }}
                        />
                    </div>

                    <p className="mt-3 text-sm">
                        Uploading images ({imageProgress}/{totalImages})
                    </p>
                </div>
            )}
        </div>
    );
}