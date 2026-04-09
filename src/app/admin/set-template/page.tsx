"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function SetTemplatePage() {
    const [schoolId, setSchoolId] = useState("");
    const [templateId, setTemplateId] = useState("");
    const [templateImage, setTemplateImage] = useState("");

    const handleSave = async () => {
        const res = await fetch("/api/admin/set-template", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                schoolId,
                templateId,
                templateImage
            })
        });

        const data = await res.json();

        if (data.success) {
            toast.success("Template saved ✅");
        } else {
            toast.error(data.message);
        }
    };

    return (
        <div className="p-6 space-y-4">
            <input
                placeholder="School ID"
                value={schoolId}
                onChange={(e) => setSchoolId(e.target.value)}
                className="border p-2 w-full"
            />

            <input
                placeholder="Template ID (e.g. NewEraEnglishSchool)"
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
                className="border p-2 w-full"
            />

            <input
                placeholder="Template Image Path (/templates/xxx.jpeg)"
                value={templateImage}
                onChange={(e) => setTemplateImage(e.target.value)}
                className="border p-2 w-full"
            />

            <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2"
            >
                Save Template
            </button>
        </div>
    );
}