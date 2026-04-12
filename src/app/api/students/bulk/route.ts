import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import * as XLSX from "xlsx";
import School from "@/models/School";

export async function POST(req: Request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = verifyToken(token);

        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        await connectDB();

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const schoolData = await School.findById(user._id);
        const data: any[] = XLSX.utils.sheet_to_json(sheet);

        const students = data.map((row) => ({
            name: row.name || "",
            class: row.class || "",
            roll: row.roll || "",
            section: row.section || "",
            admissionNo: row.admissionNo || "",
            father: row.father || "",
            mother: row.mother || "",
            phone: row.phone || "",
            dob : row.dob || "",
            address: row.address || "",
            school: schoolData?.name || "",
            schoolId: user._id,
        }));

        await Student.insertMany(students);

        return NextResponse.json({
            success: true,
            count: students.length,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error uploading" }, { status: 500 });
    }
}