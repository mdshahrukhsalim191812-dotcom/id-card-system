import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function GET() {

    try {

        await connectDB();

        const students = await Student.find()

            .populate(
                "schoolId",
                "name email templateId templateImage"
            )

            .sort({
                createdAt: -1,
            });

        return NextResponse.json(students);

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Server Error",
            },
            {
                status: 500,
            }
        );
    }
}