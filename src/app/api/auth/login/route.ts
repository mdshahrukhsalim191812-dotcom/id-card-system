import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();

        const school = await School.findOne({ email: body.email });

        if (!school) {
            return NextResponse.json(
                { message: "User not found ❌" },
                { status: 404 }
            );
        }

        const isMatch = await bcrypt.compare(body.password, school.password);

        if (!isMatch) {
            return NextResponse.json(
                { message: "Wrong password ❌" },
                { status: 401 }
            );
        }

        return NextResponse.json({
            message: "Login successful ✅",
            school,
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}