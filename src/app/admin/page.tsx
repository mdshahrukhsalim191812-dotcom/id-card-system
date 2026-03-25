"use client";

import { useEffect, useState } from "react";

type Student = {
    name: string;
    class: string;
    roll: string;
};

export default function AdminPage() {
    const [students, setStudents] = useState<Student[]>([]);

    // Fetch students from API
    const fetchStudents = async () => {
        const res = await fetch("/api/students");
        const data = await res.json();
        setStudents(data);
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchStudents();
        }
        loadData();
    }, []);

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Admin Panel
            </h1>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Class</th>
                            <th className="p-3">Roll</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((s, i) => (
                            <tr key={i} className="border-t">
                                <td className="p-3">{s.name}</td>
                                <td className="p-3">{s.class}</td>
                                <td className="p-3">{s.roll}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
}