import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";
import { rateLimiter } from "@/lib/rateLimiter";
import { loginSchema } from "@/lib/validation";

export async function POST(req: Request) {
    try {
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0] ||
            "127.0.0.1";

        try {
            await rateLimiter.consume(ip);
        } catch {
            return NextResponse.json(
                { message: "Too many attempts. Try again later 🚫" },
                { status: 429 }
            );
        }

        const body = await req.json();

        const parsed = loginSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: parsed.error.issues[0].message },
                { status: 400 }
            );
        }

        await connectDB();

        const school = await School.findOne({ email: body.email });

        if (!school) {
            return NextResponse.json(
                { message: "User not found ❌" },
                { status: 404 }
            );
        }

        const isMatch = await bcrypt.compare(body.password, school.password);

        if (!isMatch) {
            return NextResponse.json(
                { message: "Wrong password ❌" },
                { status: 401 }
            );
        }

        const token = generateToken(school);

        const response = NextResponse.json({
            message: "Login successful ✅",
            school: {
                _id: school._id,
                name: school.name,
                email: school.email,
                template: school.template,
            },
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return response;

    } catch (error) {
        console.log("Error", error);
        return NextResponse.json({ message: "Server Error ❌" }, { status: 500 });
    }
}