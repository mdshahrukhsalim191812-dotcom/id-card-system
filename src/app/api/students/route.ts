import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Student from "@/models/Student";

export async function GET(req: Request) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");

    const students = await Student.find({ schoolId });

    return NextResponse.json(students);
}