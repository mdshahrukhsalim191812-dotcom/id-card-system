import { connectDB } from "@/lib/db";

import School from "@/models/School";

import { NextResponse } from "next/server";

import { verifyAdmin } from "@/lib/verifyAdmin";

export const dynamic = "force-dynamic";

export async function GET() {

    try {

        // ================= ADMIN VERIFY =================
        const admin =
            await verifyAdmin();

        if (!admin.success) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        admin.message,
                },
                {
                    status: 401,
                }
            );
        }

        // ================= CONNECT DATABASE =================
        await connectDB();

        // ================= GET SCHOOLS =================
        const schools =
            await School.find({
                role: "school",
            })

                .select("-password")

                .sort({
                    createdAt: -1,
                });

        // ================= RESPONSE =================
        return NextResponse.json(
            schools
        );

    } catch (error) {

        console.log(
            "ADMIN SCHOOLS ERROR ❌",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Server Error",
            },
            {
                status: 500,
            }
        );
    }
}