import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized ❌" },
                { status: 401 }
            );
        }

        const user = verifyToken(token);

        if (!user) {
            return NextResponse.json(
                { message: "Invalid token ❌" },
                { status: 401 }
            );
        }

        await connectDB();

        const school = await School.findById(user._id).lean();

        if (!school) {
            return NextResponse.json(
                { message: "School not found ❌" },
                { status: 404 }
            );
        }

        return NextResponse.json({ school });

    } catch (error) {
        console.error("Auth ME Error:", error);
        return NextResponse.json(
            { message: "Server error ❌" },
            { status: 500 }
        );
    }
}