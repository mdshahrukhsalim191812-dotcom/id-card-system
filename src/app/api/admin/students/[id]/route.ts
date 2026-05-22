import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Student from "@/models/Student";

import { verifyAdmin } from "@/lib/verifyAdmin";

type Params = {
    params: {
        id: string;
    };
};

export async function DELETE(
    req: Request,
    { params }: Params
) {

    try {

        // ✅ VERIFY ADMIN
        const admin = await verifyAdmin();

        if (!admin.success) {

            return NextResponse.json(
                {
                    success: false,
                    message: admin.message,
                },
                {
                    status: 401,
                }
            );
        }

        // ✅ CONNECT DATABASE
        await connectDB();

        // ✅ DELETE STUDENT
        await Student.findByIdAndDelete(
            params.id
        );

        return NextResponse.json({
            success: true,
            message:
                "Student deleted successfully",
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Delete failed",
            },
            {
                status: 500,
            }
        );
    }
}