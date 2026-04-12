"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function BulkUploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [zipFile, setZipFile] = useState<File | null>(null);

    const handleUpload = async () => {
        if (!file) {
            toast.error("Select Excel file first ❌");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        // ✅ Add ZIP if selected
        if (zipFile) {
            formData.append("images", zipFile);
        }

        try {
            const res = await fetch("/api/students/bulk", {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            const data = await res.json();

            if (data.success) {
                toast.success(`Uploaded ${data.count} students ✅`);
            } else {
                toast.error(data.message || "Upload failed ❌");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error ❌");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                Bulk Upload Students
            </h1>

            {/* 📊 Excel Upload */}
            <div className="mb-4">
                <label className="block font-semibold mb-1">
                    Upload Excel File
                </label>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="border p-2 w-full"
                />
            </div>

            {/* 📦 ZIP Upload */}
            <div className="mb-4">
                <label className="block font-semibold mb-1">
                    Upload Images ZIP (optional)
                </label>
                <input
                    type="file"
                    accept=".zip"
                    onChange={(e) => setZipFile(e.target.files?.[0] || null)}
                    className="border p-2 w-full"
                />
            </div>

            {/* 🚀 Upload Button */}
            <button
                onClick={handleUpload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full"
            >
                Upload Data
            </button>
        </div>
    );
}