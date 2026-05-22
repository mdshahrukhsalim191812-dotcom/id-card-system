import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {

    const hashed = await bcrypt.hash(
        "admin123",
        10
    );

    return NextResponse.json({
        password: hashed,
    });
}