import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";

export async function GET() {

    try {

        await connectDB();

        const schools = await School.find()
            .select("-password")
            .sort({ createdAt: -1 });

        return NextResponse.json(schools);

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