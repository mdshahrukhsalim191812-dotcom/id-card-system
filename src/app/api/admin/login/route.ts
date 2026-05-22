import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
    try {

        const body = await req.json();

        const { email, password } = body;

        await connectDB();

        // FIND ADMIN ONLY
        const admin = await School.findOne({
            email,
            role: "admin",
        });

        if (!admin) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Admin not found",
                },
                {
                    status: 404,
                }
            );
        }

        // CHECK PASSWORD
        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isMatch) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Wrong password",
                },
                {
                    status: 401,
                }
            );
        }

        // GENERATE TOKEN
        const token = generateToken({
            id: admin._id.toString(),
            email: admin.email,
            role: admin.role,
        });

        const response = NextResponse.json({
            success: true,
            message: "Admin login successful",
            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });

        response.cookies.set("adminToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;

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