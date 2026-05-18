"use client";

import { useEffect, useState } from "react";

type School = {
    _id: string;
    name: string;
    email: string;
};

export default function AdminSchoolsPage() {

    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // FETCH SCHOOLS
    const fetchSchools = async () => {

        try {

            const res = await fetch("/api/admin/schools");

            const data = await res.json();

            setSchools(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchSchools();
    }, []);

    // SEARCH FILTER
    const filteredSchools = schools.filter((school) =>
        school.name.toLowerCase().includes(search.toLowerCase())
    );

    // LOADING
    if (loading) {
        return (
            <div className="flex items-center justify-center h-[70vh]">

                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            </div>
        );
    }

    return (
        <div>

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Schools
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Total Schools: {schools.length}
                    </p>

                </div>

                {/* SEARCH */}
                <input
                    type="text"
                    placeholder="Search schools..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-3 w-full md:w-[320px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr className="text-left">

                            <th className="p-4">School Name</th>

                            <th className="p-4">Email</th>

                            <th className="p-4">School ID</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredSchools.map((school) => (

                            <tr
                                key={school._id}
                                className="border-t hover:bg-gray-50 transition"
                            >

                                <td className="p-4 font-semibold">
                                    {school.name}
                                </td>

                                <td className="p-4 text-gray-600">
                                    {school.email}
                                </td>

                                <td className="p-4 text-gray-500 text-sm">
                                    {school._id}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}