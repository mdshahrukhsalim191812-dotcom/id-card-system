import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        await connectDB();

        // 🔐 Get token from header
        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];

        // 🔐 Verify token
        const user = verifyToken(token);

        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }

        // ✅ Only authorized user can access
        const schools = await School.find().select("-password");

        return NextResponse.json(schools);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error" }, { status: 500 });
    }
}