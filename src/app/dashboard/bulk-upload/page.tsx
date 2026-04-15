"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";

export default function BulkUploadPage({
    onUploadSuccess,
}: {
    onUploadSuccess: () => void;
}) {
    const [file, setFile] = useState<File | null>(null);
    const [zipFile, setZipFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const fileRef = useRef<HTMLInputElement>(null);
    const zipRef = useRef<HTMLInputElement>(null);

    const handleUpload = async () => {
        if (loading) return;

        if (!file) {
            toast.error("Select Excel file ❌");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        if (zipFile) formData.append("images", zipFile);

        try {
            const res = await fetch("/api/students/bulk", {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            const data = await res.json();

            if (data.success) {
                toast.success(
                    `${data.inserted} added | ⚠️ ${data.skipped} skipped`
                );

                setUploaded(true);
                onUploadSuccess();

                // reset
                setFile(null);
                setZipFile(null);

                if (fileRef.current) fileRef.current.value = "";
                if (zipRef.current) zipRef.current.value = "";
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Server error ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">
            Bulk Upload Students
            </h1>

            {/* Excel */}
            <div className="mb-4">
                <label className="font-semibold">Excel File</label>
                <input
                    ref={fileRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={(e) => {
                        setUploaded(false);
                        setFile(e.target.files?.[0] || null);
                    }}
                    className="border p-2 w-full rounded mt-1"
                />
            </div>

            {/* ZIP */}
            <div className="mb-4">
                <label className="font-semibold">Images ZIP</label>
                <input
                    ref={zipRef}
                    type="file"
                    accept=".zip"
                    onChange={(e) => {
                        setUploaded(false);
                        setZipFile(e.target.files?.[0] || null);
                    }}
                    className="border p-2 w-full rounded mt-1"
                />
            </div>

            {/* Button */}
            <button
                onClick={handleUpload}
                disabled={loading || uploaded || !file}
                className={`w-full py-2 rounded text-white font-semibold transition ${loading || uploaded || !file
                        ? "bg-gray-400"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                {loading
                    ? "⏳ Uploading..."
                    : uploaded
                        ? "Uploaded"
                        : "Upload Data"}
            </button>

            {/* Reset */}
            {uploaded && (
                <button
                    onClick={() => {
                        setUploaded(false);
                        toast("Ready for new upload 👍");
                    }}
                    className="mt-3 w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Upload New File
                </button>
            )}
        </div>
    );
}