import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import { cookies } from "next/headers";
import cloudinary from "@/lib/cloudinary";
import { verifyToken } from "@/lib/auth";
import { studentSchema } from "@/lib/validation";
import School from "@/models/School"


export async function GET(req: Request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized ❌" }, { status: 401 });
        }

        const user = verifyToken(token);

        if (!user) {
            return NextResponse.json({ message: "Invalid Token ❌" }, { status: 401 });
        }

        await connectDB();

        if (user.role === "admin") {
            const students = await Student.find().populate("schoolId", "name email");
            return NextResponse.json(students);
        } else {
            const students = await Student.find({ schoolId: user._id })
                .populate("schoolId", "name email");
            return NextResponse.json(students);
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error ❌" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized ❌" }, { status: 401 });
        }

        const user = verifyToken(token);

        if (!user) {
            return NextResponse.json({ message: "Invalid Token ❌" }, { status: 401 });
        }

        await connectDB();

        const body = await req.json();


        const parsed = studentSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: parsed.error.issues[0].message },
                { status: 400 }
            );
        }

        const uploads = await Promise.all([
            body.image
                ? cloudinary.uploader.upload(body.image, { folder: "students" })
                : null,
            body.logo
                ? cloudinary.uploader.upload(body.logo, { folder: "logos" })
                : null,
            body.signature
                ? cloudinary.uploader.upload(body.signature, { folder: "signatures" })
                : null,
        ]);

        const imageUrl = uploads[0]?.secure_url || "";
        const logoUrl = uploads[1]?.secure_url || "";
        const signatureUrl = uploads[2]?.secure_url || "";

        const student = await Student.create({
            school: body.school,
            admissionNo: body.admissionNo,
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

            template: body.template || "1",

            ...(imageUrl && { image: imageUrl }),
            ...(logoUrl && { logo: logoUrl }),
            ...(signatureUrl && { signature: signatureUrl }),

            schoolId: user._id
        });

        return NextResponse.json({
            success: true,
            data: student
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error ❌" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized ❌" }, { status: 401 });
        }

        const user = verifyToken(token);

        if (!user) {
            return NextResponse.json({ message: "Invalid Token ❌" }, { status: 401 });
        }

        await connectDB();

        const body = await req.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ message: "Student ID required" }, { status: 400 });
        }

        let updateData: any = { ...body };

        if (body.image && body.image.startsWith("data:")) {
            const upload = await cloudinary.uploader.upload(body.image, {
                folder: "students"
            });
            updateData.image = upload.secure_url;
        }

        if (body.logo && body.logo.startsWith("data:")) {
            const upload = await cloudinary.uploader.upload(body.logo, {
                folder: "logos"
            });
            updateData.logo = upload.secure_url;
        }

        if (body.signature && body.signature.startsWith("data:")) {
            const upload = await cloudinary.uploader.upload(body.signature, {
                folder: "signatures"
            });
            updateData.signature = upload.secure_url;
        }

        delete updateData.id;

        const updatedStudent = await Student.findOneAndUpdate(
            { _id: id, schoolId: user._id },
            updateData,
            { new: true }
        );

        return NextResponse.json({
            success: true,
            data: updatedStudent
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error ❌" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized ❌" }, { status: 401 });
        }

        const user = verifyToken(token);

        if (!user) {
            return NextResponse.json({ message: "Invalid Token ❌" }, { status: 401 });
        }

        await connectDB();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "Student ID required" }, { status: 400 });
        }

        await Student.findOneAndDelete({
            _id: id,
            schoolId: user._id,
        });

        return NextResponse.json({
            success: true,
            message: "Deleted successfully 🗑️"
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error ❌" }, { status: 500 });
    }
}
// 🔥 DELETE MANY (BULK)
export async function PATCH(req: Request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized ❌" }, { status: 401 });
        }

        const user = verifyToken(token);

        if (!user) {
            return NextResponse.json({ message: "Invalid Token ❌" }, { status: 401 });
        }

        await connectDB();

        const body = await req.json();
        const { ids } = body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { message: "IDs required" },
                { status: 400 }
            );
        }

        // 🔥 DELETE ONLY USER'S STUDENTS (SECURITY)
        const result = await Student.deleteMany({
            _id: { $in: ids },
            schoolId: user._id,
        });

        return NextResponse.json({
            success: true,
            deletedCount: result.deletedCount,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error ❌" }, { status: 500 });
    }
}