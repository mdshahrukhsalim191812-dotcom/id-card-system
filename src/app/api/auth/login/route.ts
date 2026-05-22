import { connectDB } from "@/lib/db";

import School from "@/models/School";

import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { generateToken } from "@/lib/auth";

import { rateLimiter } from "@/lib/rateLimiter";

import { loginSchema } from "@/lib/validation";

export async function POST(req: Request) {

    try {

        // ================= RATE LIMIT =================
        const ip =
            req.headers
                .get("x-forwarded-for")
                ?.split(",")[0] ||
            "127.0.0.1";

        try {

            await rateLimiter.consume(ip);

        } catch {

            return NextResponse.json(
                {
                    message:
                        "Too many attempts. Try again later 🚫",
                },
                {
                    status: 429,
                }
            );
        }

        // ================= BODY =================
        const body = await req.json();

        const parsed =
            loginSchema.safeParse(body);

        if (!parsed.success) {

            return NextResponse.json(
                {
                    message:
                        parsed.error.issues[0].message,
                },
                {
                    status: 400,
                }
            );
        }

        // ================= DATABASE =================
        await connectDB();

        // ONLY SCHOOL LOGIN
        const school =
            await School.findOne({
                email: body.email,
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

        // ================= PASSWORD =================
        const isMatch =
            await bcrypt.compare(
                body.password,
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

        // ================= TOKEN =================
        const token =
            generateToken({
                id: school._id.toString(),

                email: school.email,

                role: "school",
            });

        // ================= RESPONSE =================
        const response =
            NextResponse.json({

                success: true,

                message:
                    "Login successful ✅",

                school: {

                    id: school._id.toString(),

                    name: school.name,

                    email: school.email,

                    role: "school",

                    template:
                        school.template,
                },
            });

        // ================= COOKIE =================
        response.cookies.set(
            "token",
            token,
            {

                httpOnly: true,

                secure:
                    process.env.NODE_ENV ===
                    "production",

                sameSite: "lax",

                path: "/",

                maxAge:
                    60 *
                    60 *
                    24 *
                    7,
            }
        );

        return response;

    } catch (error) {

        console.log(
            "LOGIN ERROR ❌",
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