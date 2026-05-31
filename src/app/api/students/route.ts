import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import { cookies } from "next/headers";
import cloudinary from "@/lib/cloudinary";
import { verifyToken } from "@/lib/auth";
import { studentSchema } from "@/lib/validation";

// ================= GET STUDENTS =================

export async function GET() {

    try {

        await connectDB();

        const cookieStore = cookies();

        const token =
            cookieStore.get("token")?.value;

        if (!token) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized ❌",
                },
                {
                    status: 401,
                }
            );

        }

        const user = verifyToken(token);

        if (!user) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid Token ❌",
                },
                {
                    status: 401,
                }
            );

        }

        // ================= ADMIN =================

        if (user.role === "admin") {

            const students =
                await Student.find()

                    .populate(
                        "schoolId",
                        "name email templateId templateImage"
                    )

                    .lean()

                    .sort({
                        createdAt: -1,
                    });

            return NextResponse.json({
                success: true,
                data: students,
            });

        }

        // ================= SCHOOL =================

        const students =
            await Student.find({
                schoolId: user.id,
            })

                .populate(
                    "schoolId",
                    "name email templateId templateImage"
                )

                .lean()

                .sort({
                    createdAt: -1,
                });

        return NextResponse.json({
            success: true,
            data: students,
        });

    } catch (error) {

        console.error(
            "GET STUDENTS ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Server Error ❌",
            },
            {
                status: 500,
            }
        );

    }

}

// ================= CREATE STUDENT =================

export async function POST(req: Request) {

    try {

        await connectDB();

        const cookieStore = cookies();

        const token =
            cookieStore.get("token")?.value;

        if (!token) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized ❌",
                },
                {
                    status: 401,
                }
            );

        }

        const user =
            verifyToken(token);

        if (!user) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid Token ❌",
                },
                {
                    status: 401,
                }
            );

        }

        const body =
            await req.json();

        // ================= VALIDATION =================

        const parsed =
            studentSchema.safeParse(body);

        if (!parsed.success) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        parsed.error.issues[0]
                            .message,
                },
                {
                    status: 400,
                }
            );

        }

        // ================= IMAGE UPLOADS =================

        const uploads =
            await Promise.all([

                body.image
                    ? cloudinary.uploader.upload(
                        body.image,
                        {
                            folder: "students",
                        }
                    )
                    : null,

                body.logo
                    ? cloudinary.uploader.upload(
                        body.logo,
                        {
                            folder: "logos",
                        }
                    )
                    : null,

                body.signature
                    ? cloudinary.uploader.upload(
                        body.signature,
                        {
                            folder: "signatures",
                        }
                    )
                    : null,

            ]);

        const imageUrl =
            uploads[0]?.secure_url || "";

        const logoUrl =
            uploads[1]?.secure_url || "";

        const signatureUrl =
            uploads[2]?.secure_url || "";

        // ================= CREATE =================

        const student =
            await Student.create({

                school: body.school,

                admissionNo:
                    body.admissionNo,

                sec: body.sec,

                name: body.name,

                class: body.class,

                roll: body.roll,

                father: body.father,

                mother: body.mother,

                phone: body.phone,

                address: body.address,

                dob: body.dob,

                blood: body.blood,

                template:
                    body.template || "1",

                ...(imageUrl && {
                    image: imageUrl,
                }),

                ...(logoUrl && {
                    logo: logoUrl,
                }),

                ...(signatureUrl && {
                    signature: signatureUrl,
                }),

                schoolId: user.id,

            });

        return NextResponse.json({
            success: true,
            data: student,
        });

    } catch (error) {

        console.error(
            "CREATE STUDENT ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Server Error ❌",
            },
            {
                status: 500,
            }
        );

    }

}

// ================= UPDATE STUDENT =================

export async function PUT(req: Request) {

    try {

        await connectDB();

        const cookieStore = cookies();

        const token =
            cookieStore.get("token")?.value;

        if (!token) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized ❌",
                },
                {
                    status: 401,
                }
            );

        }

        const user =
            verifyToken(token);

        if (!user) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid Token ❌",
                },
                {
                    status: 401,
                }
            );

        }

        const body =
            await req.json();

        const { id } = body;

        if (!id) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Student ID required",
                },
                {
                    status: 400,
                }
            );

        }

        let updateData: any = {
            ...body,
        };

        // IMAGE

        if (
            body.image &&
            body.image.startsWith("data:")
        ) {

            const upload =
                await cloudinary.uploader.upload(
                    body.image,
                    {
                        folder: "students",
                    }
                );

            updateData.image =
                upload.secure_url;

        }

        // LOGO

        if (
            body.logo &&
            body.logo.startsWith("data:")
        ) {

            const upload =
                await cloudinary.uploader.upload(
                    body.logo,
                    {
                        folder: "logos",
                    }
                );

            updateData.logo =
                upload.secure_url;

        }

        // SIGNATURE

        if (
            body.signature &&
            body.signature.startsWith("data:")
        ) {

            const upload =
                await cloudinary.uploader.upload(
                    body.signature,
                    {
                        folder: "signatures",
                    }
                );

            updateData.signature =
                upload.secure_url;

        }

        delete updateData.id;

        const updatedStudent =
            await Student.findOneAndUpdate(

                {
                    _id: id,
                    schoolId: user.id,
                },

                updateData,

                {
                    new: true,
                }

            );

        return NextResponse.json({
            success: true,
            data: updatedStudent,
        });

    } catch (error) {

        console.error(
            "UPDATE STUDENT ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Server Error ❌",
            },
            {
                status: 500,
            }
        );

    }

}

// ================= DELETE STUDENT =================

export async function DELETE(req: Request) {

    try {

        await connectDB();

        const cookieStore = cookies();

        const token =
            cookieStore.get("token")?.value;

        if (!token) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized ❌",
                },
                {
                    status: 401,
                }
            );

        }

        const user =
            verifyToken(token);

        if (!user) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid Token ❌",
                },
                {
                    status: 401,
                }
            );

        }

        const { searchParams } =
            new URL(req.url);

        const id =
            searchParams.get("id");

        if (!id) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Student ID required",
                },
                {
                    status: 400,
                }
            );

        }

        await Student.findOneAndDelete({

            _id: id,

            schoolId: user.id,

        });

        return NextResponse.json({
            success: true,
            message:
                "Deleted successfully 🗑️",
        });

    } catch (error) {

        console.error(
            "DELETE STUDENT ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Server Error ❌",
            },
            {
                status: 500,
            }
        );

    }

}

// ================= BULK DELETE =================

export async function PATCH(req: Request) {

    try {

        await connectDB();

        const cookieStore = cookies();

        const token =
            cookieStore.get("token")?.value;

        if (!token) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized ❌",
                },
                {
                    status: 401,
                }
            );

        }

        const user =
            verifyToken(token);

        if (!user) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid Token ❌",
                },
                {
                    status: 401,
                }
            );

        }

        const body =
            await req.json();

        const { ids } = body;

        if (
            !ids ||
            !Array.isArray(ids) ||
            ids.length === 0
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message: "IDs required",
                },
                {
                    status: 400,
                }
            );

        }

        const result =
            await Student.deleteMany({

                _id: {
                    $in: ids,
                },

                schoolId: user.id,

            });

        return NextResponse.json({

            success: true,

            deletedCount:
                result.deletedCount,

        });

    } catch (error) {

        console.error(
            "BULK DELETE ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Server Error ❌",
            },
            {
                status: 500,
            }
        );

    }

}