import { connectDB } from "@/lib/db";

import Student from "@/models/Student";

import { NextResponse } from "next/server";

import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET() {

    try {

        // ================= VERIFY SUPER ADMIN =================
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

        // ================= CONNECT DB =================
        await connectDB();

        // ================= FETCH STUDENTS =================
        const students =
            await Student.find()

                .populate(
                    "schoolId",
                    `
                    name
                    email
                    templateId
                    templateImage
                    `
                )

                .sort({
                    createdAt: -1,
                });

        // ================= RESPONSE =================
        return NextResponse.json(
            students
        );

    } catch (error) {

        console.log(
            "ADMIN STUDENTS ERROR ❌",
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