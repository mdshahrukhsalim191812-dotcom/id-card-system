import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import * as XLSX from "xlsx";
import School from "@/models/School";
import AdmZip from "adm-zip";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
    try {
        // 🔐 AUTH
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = verifyToken(token);

        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        await connectDB();

        const formData = await req.formData();

        const file = formData.get("file") as File;
        const zipFile = formData.get("images") as File;

        if (!file) {
            return NextResponse.json({ message: "No Excel file uploaded" }, { status: 400 });
        }

        // 📊 READ EXCEL
        const buffer = Buffer.from(await file.arrayBuffer());
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data: any[] = XLSX.utils.sheet_to_json(sheet);

        // 🏫 GET SCHOOL
        const schoolData = await School.findById(user._id);

        // 🖼️ IMAGE MAP
        let imageMap: Record<string, string> = {};

        if (zipFile) {
            const zipBuffer = Buffer.from(await zipFile.arrayBuffer());
            const zip = new AdmZip(zipBuffer);
            const entries = zip.getEntries();

            // ✅ IMPORTANT: use for...of (not forEach)
            for (const entry of entries) {
                if (!entry.isDirectory) {
                    // ✅ FIX: remove folder path
                    const fileName = entry.entryName.split("/").pop();
                    const roll = fileName?.split(".")[0];

                    if (roll) {
                        const fileBuffer = entry.getData();

                        // 🔄 Convert to base64
                        const base64 = fileBuffer.toString("base64");

                        // ☁️ Upload to Cloudinary
                        const uploadRes = await cloudinary.uploader.upload(
                            `data:image/jpeg;base64,${base64}`,
                            {
                                folder: "students",
                            }
                        );

                        // ✅ Save URL
                        imageMap[roll] = uploadRes.secure_url;
                    }
                }
            }
        }

        // 👨‍🎓 MAP STUDENTS
        const students = data.map((row) => {
            const roll = String(row.roll || "");

            return {
                name: row.name || "",
                class: row.class || "",
                roll: roll,
                section: row.section || "",
                admissionNo: row.admissionNo || "",
                father: row.father || "",
                mother: row.mother || "",
                phone: row.phone || "",
                dob: row.dob || "",
                address: row.address || "",
                school: schoolData?.name || "",
                schoolId: user._id,

                // 🖼️ REAL IMAGE URL
                image: imageMap[roll] || "",
            };
        });

        // 💾 SAVE TO DB
        await Student.insertMany(students);

        return NextResponse.json({
            success: true,
            count: students.length,
        });

    } catch (error) {
        console.error("Bulk Upload Error:", error);
        return NextResponse.json({ message: "Error uploading" }, { status: 500 });
    }
}