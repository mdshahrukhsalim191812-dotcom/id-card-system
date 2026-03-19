"use client";

import { useEffect, useState } from "react";

type Student = {
    _id: string;
    name: string;
    class: string;
    roll: string;
};

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            const schoolId = localStorage.getItem("schoolId");

            const res = await fetch(`/api/students?schoolId=${schoolId}`);
            const data = await res.json();

            setStudents(data);
        } catch (error) {
            console.error("Error fetching students", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchStudents();
        };
        loadData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Students List</h1>

            {loading ? (
                <p>Loading...</p>
            ) : students.length === 0 ? (
                <p>No students found</p>
            ) : (
                <div className="bg-white shadow rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Class</th>
                                <th className="p-3">Roll</th>
                            </tr>
                        </thead>

                        <tbody>
                            {students.map((student) => (
                                <tr key={student._id} className="border-t">
                                    <td className="p-3">{student.name}</td>
                                    <td className="p-3">{student.class}</td>
                                    <td className="p-3">{student.roll}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}