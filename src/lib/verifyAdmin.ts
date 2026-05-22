import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function verifyAdmin() {

    try {

        // ================= GET ADMIN TOKEN =================
        const token =
            (await cookies())
                .get("adminToken")
                ?.value;

        // ================= NO TOKEN =================
        if (!token) {

            return {
                success: false,
                message: "Unauthorized",
            };
        }

        // ================= VERIFY TOKEN =================
        const decoded: any =
            jwt.verify(
                token,
                process.env.JWT_SECRET!
            );

        // ================= ROLE CHECK =================
        if (decoded.role !== "admin") {

            return {
                success: false,
                message: "Access Denied",
            };
        }

        // ================= SUCCESS =================
        return {
            success: true,
            admin: decoded,
        };

    } catch (error) {

        console.log(
            "VERIFY ADMIN ERROR ❌",
            error
        );

        return {
            success: false,
            message: "Invalid Token",
        };
    }
}