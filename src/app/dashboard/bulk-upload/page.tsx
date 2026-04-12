"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function BulkUploadPage() {
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = async () => {
        if (!file) {
            toast.error("Select file first ❌");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/students/bulk", {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
            toast.success(`Uploaded ${data.count} students ✅`);
        } else {
            toast.error("Upload failed ❌");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Bulk Upload Students</h1>

            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mb-4"
            />

            <button
                onClick={handleUpload}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Upload Excel
            </button>
        </div>
    );
}