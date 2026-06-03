import { connectDB } from "@/lib/db";

import School from "@/models/School";

import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

export async function POST(req: Request) {

    try {

        // ================= BODY =================
        const body = await req.json();

        const {
            email,
            password,
        } = body;

        // ================= VALIDATION =================
        if (!email || !password) {

            return NextResponse.json(
                {
                    message:
                        "Email and password required ❌",
                },
                {
                    status: 400,
                }
            );
        }

        // ================= DATABASE =================
        await connectDB();

        // ================= FIND SCHOOL =================
        const school =
            await School.findOne({
                email,
                role: "school",
            });

        if (!school) {

            return NextResponse.json(
                {
                    message:
                        "School account not found ❌",
                },
                {
                    status: 404,
                }
            );
        }

        // ================= CHECK PASSWORD =================
        const isMatch =
            await bcrypt.compare(
                password,
                school.password
            );

        if (!isMatch) {

            return NextResponse.json(
                {
                    message:
                        "Wrong password ❌",
                },
                {
                    status: 401,
                }
            );
        }

        // ================= SUCCESS =================
        return NextResponse.json({
            success: true,
            message:
                "Credentials verified ✅",
        });

    } catch (error) {

        console.log(
            "CHECK LOGIN ERROR ❌",
            error
        );

        return NextResponse.json(
            {
                message:
                    "Server Error ❌",
            },
            {
                status: 500,
            }
        );
    }
}