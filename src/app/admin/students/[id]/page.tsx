"use client";

import { useEffect, useState } from "react";

import NewEraEnglishSchool from "@/components/templates/NewEraEnglishSchool";
import BalBhartiSchool from "@/components/templates/BalBhartiSchool";
import HappyValleySchoolBhagalpur from "@/components/templates/HappyValleySchoolBhagalpur";

export default function StudentDetailsPage({
    params,
}: {
    params: { id: string };
}) {

    const [student, setStudent] = useState<any>(null);

    useEffect(() => {

        fetch("/api/admin/students")
            .then((res) => res.json())
            .then((data) => {

                const foundStudent = data.find(
                    (s: any) => s._id === params.id
                );

                setStudent(foundStudent);

            });

    }, [params.id]);

    if (!student) {
        return (
            <div className="p-10 text-2xl font-bold">
                Loading...
            </div>
        );
    }

    const templateId = student?.schoolId?.templateId;

    return (

        <div className="p-6">

            {/* ================= TEMPLATE RENDER ================= */}

            {templateId === "NewEraEnglishSchool" && (
                <NewEraEnglishSchool
                    student={student}
                    image={student.image}
                    logo={student.logo}
                    signature={student.signature}
                    school={student.schoolId}
                    formatDate={(date: any) =>
                        date
                            ? new Date(date).toLocaleDateString("en-GB")
                            : ""
                    }
                />
            )}

                {templateId === "BalBhartiSchool" && (
                    <BalBhartiSchool
                        student={student}
                        image={student.image}
                        logo={student.logo}
                        signature={student.signature}
                        school={student.schoolId}
                        formatDate={(date: any) =>
                            date
                                ? new Date(date).toLocaleDateString("en-GB")
                                : ""
                        }
                    />
                )}

                {templateId === "HappyValleySchoolBhagalpur" && (
                    <HappyValleySchoolBhagalpur
                        student={student}
                        image={student.image}
                        logo={student.logo}
                        signature={student.signature}
                        school={student.schoolId}
                        formatDate={(date: any) =>
                            date
                                ? new Date(date).toLocaleDateString("en-GB")
                                : ""
                        }
                    />
                )}

        </div>

    );
}