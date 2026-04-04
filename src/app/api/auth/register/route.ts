import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();

        // ✅ Check if already exists
        const existingSchool = await School.findOne({ email: body.email });

        if (existingSchool) {
            return NextResponse.json(
                { message: "School already exists ❌" },
                { status: 400 }
            );
        }

        // ✅ Hash password
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // ✅ Create school
        await School.create({
            name: body.name,
            email: body.email,
            password: hashedPassword,
        });

        // ✅ DO NOT return password
        return NextResponse.json({
            success: true,
            message: "School registered successfully ✅",
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Server Error ❌" },
            { status: 500 }
        );
    }
}