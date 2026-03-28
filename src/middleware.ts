import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    const isAuthPage = ["/login", "/register"].includes(req.nextUrl.pathname);

    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

    console.log("token :", token)
    console.log("Path :", req.nextUrl.pathname)
    // Protect dashboard
    if (isDashboard) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            console.log("VALID TOKEN ✅", decoded);
        } catch (err) {
            console.log("INVALID TOKEN ❌", err);
        }
    }

    // Prevent login if already logged in
    if (isAuthPage) {
        if (token) {
            try {
                jwt.verify(token, process.env.JWT_SECRET!);
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }
            catch {
                return NextResponse.next();
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register"],
};