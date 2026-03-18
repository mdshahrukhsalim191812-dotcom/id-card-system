"use client";

import { useState } from "react";
import IDCard from "@/components/IDCard";
import TemplateSelector from "@/components/TemplateSelector";

export default function CreateID() {
    const [student, setStudent] = useState({
        name: "John Doe",
        class: "10",
        roll: "23",
    });

    const [template, setTemplate] = useState("classic");

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Create ID Card</h1>

            <TemplateSelector setTemplate={setTemplate} />

            <div className="mt-6">
                <IDCard student={student} template={template} />
            </div>
        </div>
    );
}