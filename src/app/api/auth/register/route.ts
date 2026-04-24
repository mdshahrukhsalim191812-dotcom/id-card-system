import { connectDB } from "@/lib/db";
import School from "@/models/School";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();

        // ✅ Check if already exists
        const existingSchool = await School.findOne({ email: body.email });

        if (existingSchool) {
            return NextResponse.json(
                { message: "School already exists ❌" },
                { status: 400 }
            );
        }

        // ✅ Hash password
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // 🔥 AUTO TEMPLATE ASSIGN LOGIC
        let templateId = "template1";
        let templateImage = "/templates/bg-1.jpeg";

        // 👉 Customize based on school name
        if (body.name.toLowerCase().includes("new era")) {
            templateId = "NewEraEnglishSchool";
            templateImage = "/templates/new-era.jpeg";
        }

        else if (body.name.toLowerCase().includes("bal bharti")) {
            templateId = "BalBhartiSchool";
            templateImage = "/templates/bal-bharti2.jpg";
        }

        else if (body.name.toLowerCase().includes("happy valley school bhagalpur")) {
            templateId = "HappyValleySchoolBhagalpur";
            templateImage = "/templates/happy-valley-school-bhagalpur.jpg";
        }

        else if (body.name.toLowerCase().includes("school a")) {
            templateId = "template2";
            templateImage = "/templates/bg-2.jpeg";
        }

        // 👉 You can add more schools here later

        // ✅ Create school with template
        await School.create({
            name: body.name,
            email: body.email,
            password: hashedPassword,
            templateId,
            templateImage
        });

        return NextResponse.json({
            success: true,
            message: "School registered successfully ✅",
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Server Error ❌" },
            { status: 500 }
        );
    }
}