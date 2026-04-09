import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = verifyToken(token);

        if (!user || user.role !== "admin") {
            return NextResponse.json({ message: "Access denied" }, { status: 403 });
        }

        await connectDB();

        const body = await req.json();

        const { schoolId, templateId, templateImage } = body;

        const updated = await School.findByIdAndUpdate(
            schoolId,
            {
                templateId,
                templateImage
            },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            data: updated
        });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}