import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

export async function GET() {

    try {

        // ================= GET TOKEN =================
        const cookieStore = await cookies();

        const token =
            cookieStore.get("token")?.value;

        if (!token) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized ❌",
                },
                {
                    status: 401,
                }
            );
        }

        // ================= VERIFY TOKEN =================
        const user = verifyToken(token);

        if (!user) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid token ❌",
                },
                {
                    status: 401,
                }
            );
        }

        // ================= CONNECT DB =================
        await connectDB();

        // ================= FIND SCHOOL =================
        const school =
            await School.findById(user.id)
                .select("-password")
                .lean();

        if (!school) {

            return NextResponse.json(
                {
                    success: false,
                    message: "School not found ❌",
                },
                {
                    status: 404,
                }
            );
        }

        // ================= SUCCESS =================
        return NextResponse.json({
            success: true,
            school,
        });

    } catch (error) {

        console.error(
            "AUTH ME ERROR ❌",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Server error ❌",
            },
            {
                status: 500,
            }
        );
    }
}