import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const schools = await School.find();

        return NextResponse.json(schools);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error" }, { status: 500 });
    }
}