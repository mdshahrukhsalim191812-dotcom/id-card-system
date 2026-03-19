import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();


        const hashedPassword = await bcrypt.hash(body.password, 10);

        const school = await School.create({
            name: body.name,
            email: body.email,
            password: hashedPassword,
        });

        return NextResponse.json({
            message: "School registered",
            school,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error" }, { status: 500 });
    }
}