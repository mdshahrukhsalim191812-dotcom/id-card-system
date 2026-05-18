import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import School from "@/models/School";
import Student from "@/models/Student";

type Params = {
    params: {
        id: string;
    };
};

export async function DELETE(
    req: Request,
    { params }: Params
) {

    try {

        await connectDB();

        const schoolId = params.id;

        // DELETE ALL STUDENTS OF SCHOOL
        await Student.deleteMany({
            schoolId,
        });

        // DELETE SCHOOL
        await School.findByIdAndDelete(schoolId);

        return NextResponse.json({
            success: true,
            message: "School deleted successfully",
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Delete failed",
            },
            {
                status: 500,
            }
        );
    }
}