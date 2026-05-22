import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET!
);

export async function middleware(
    req: NextRequest
) {

    const schoolToken =
        req.cookies.get("token")?.value;

    const adminToken =
        req.cookies.get("adminToken")?.value;

    const pathname =
        req.nextUrl.pathname;

    // ================= SCHOOL =================
    const isSchoolDashboard =
        pathname.startsWith("/dashboard");

    // ================= ADMIN =================
    const isAdminRoute =
        pathname === "/admin" ||
        pathname.startsWith("/admin/");

    const isAdminLogin =
        pathname === "/admin-login";

    // ================= SCHOOL PROTECTION =================
    if (isSchoolDashboard) {

        if (!schoolToken) {

            return NextResponse.redirect(
                new URL("/login", req.url)
            );
        }

        try {

            const { payload }: any =
                await jwtVerify(
                    schoolToken,
                    secret
                );

            if (
                payload.role !== "school"
            ) {

                return NextResponse.redirect(
                    new URL("/login", req.url)
                );
            }

        } catch {

            return NextResponse.redirect(
                new URL("/login", req.url)
            );
        }
    }

    // ================= ADMIN PROTECTION =================
    if (isAdminRoute && !isAdminLogin) {

        if (!adminToken) {

            return NextResponse.redirect(
                new URL("/admin-login", req.url)
            );
        }

        try {

            const { payload }: any =
                await jwtVerify(
                    adminToken,
                    secret
                );

            if (
                payload.role !== "admin"
            ) {

                return NextResponse.redirect(
                    new URL("/admin-login", req.url)
                );
            }

        } catch {

            return NextResponse.redirect(
                new URL("/admin-login", req.url)
            );
        }
    }

    // ================= PREVENT RELOGIN =================
    if (isAdminLogin && adminToken) {

        try {

            const { payload }: any =
                await jwtVerify(
                    adminToken,
                    secret
                );

            if (
                payload.role === "admin"
            ) {

                return NextResponse.redirect(
                    new URL("/admin", req.url)
                );
            }

        } catch { }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/admin-login",
    ],
};