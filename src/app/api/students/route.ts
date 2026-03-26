import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import { cookies } from "next/headers";
import cloudinary from "@/lib/cloudinary";
import { verifyToken } from "@/lib/verifyToken";


export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized ❌" }, { status: 401 });
        }

        const user = verifyToken(token);

        if (!user) {
            return NextResponse.json({ message: "Invalid Token ❌" }, { status: 401 });
        }

        await connectDB();

        const students = await Student.find({ schoolId: user.id });

        return NextResponse.json(students);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error ❌" }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
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


        if (!body.name || !body.class || !body.roll) {
            return NextResponse.json(
                { message: "Missing required fields ❌" },
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
            tag: body.tag,
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

            schoolId: user.id
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
        const cookieStore = await cookies();
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

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
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
        const cookieStore = await cookies();
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

        await Student.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: "Deleted successfully 🗑️"
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error ❌" }, { status: 500 });
    }
}