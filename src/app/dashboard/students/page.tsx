"use client";

export default function StudentsPage() {
    const students = [
        { name: "Aman Kumar", class: "10", roll: "12" },
        { name: "Riya Sharma", class: "9", roll: "5" },
        { name: "Arjun Singh", class: "8", roll: "21" },
    ];

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">Students</h1>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Class</th>
                            <th className="p-3">Roll No</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-3">{student.name}</td>
                                <td className="p-3">{student.class}</td>
                                <td className="p-3">{student.roll}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
}