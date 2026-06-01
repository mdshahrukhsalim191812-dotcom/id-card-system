import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import * as XLSX from "xlsx";
import School from "@/models/School";
import AdmZip from "adm-zip";
import cloudinary from "@/lib/cloudinary";
import crypto from "crypto";

export async function POST(req: Request) {

    try {

        // 🔐 AUTH
        const cookieStore = cookies();

        const token = cookieStore.get("token")?.value;

        if (!token) {

            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const user: any = verifyToken(token);

        if (!user) {

            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }

        const schoolId = user.id;

        if (!schoolId) {

            return NextResponse.json(
                { message: "School ID missing" },
                { status: 400 }
            );
        }

        await connectDB();

        // 🔥 FORM DATA
        const formData = await req.formData();

        const file = formData.get("file") as File;

        const zipFile = formData.get("images") as File;

        if (!file || file.size === 0) {

            return NextResponse.json(
                { message: "No Excel file uploaded" },
                { status: 400 }
            );
        }

        // 🔥 FILE HASH
        const buffer = Buffer.from(
            await file.arrayBuffer()
        );

        const fileHash = crypto
            .createHash("md5")
            .update(buffer)
            .digest("hex");

        // 🔥 PREVENT SAME FILE REUPLOAD
        const alreadyUploaded =
            await Student.findOne({
                schoolId,
                fileHash,
            });

        if (alreadyUploaded) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "This Excel file already uploaded",
                },
                { status: 400 }
            );
        }

        // 📊 READ EXCEL
        const workbook = XLSX.read(buffer, {
            type: "buffer",
        });

        const sheet =
            workbook.Sheets[
            workbook.SheetNames[0]
            ];

        const data: any[] =
            XLSX.utils.sheet_to_json(sheet);

        // 🏫 SCHOOL
        const schoolData =
            await School.findById(schoolId);

        // 🖼️ IMAGE MAP
        let imageMap: Record<string, string> = {};

        let imageMissing = 0;

        // 🔥 ZIP IMAGE PROCESS
        if (zipFile) {

            const zipBuffer = Buffer.from(
                await zipFile.arrayBuffer()
            );

            const zip = new AdmZip(zipBuffer);

            const entries = zip.getEntries();

            for (const entry of entries) {

                if (entry.isDirectory) continue;

                const fileName =
                    entry.entryName
                        .split("/")
                        .pop();

                const ext = fileName
                    ?.split(".")
                    .pop()
                    ?.toLowerCase();

                if (
                    !["jpg", "jpeg", "png", "webp"]
                        .includes(ext || "")
                ) {
                    continue;
                }

                const key =
                    fileName?.split(".")[0];

                try {

                    const fileBuffer =
                        entry.getData();

                    const base64 =
                        fileBuffer.toString(
                            "base64"
                        );

                    let mimeType =
                        "image/jpeg";

                    if (ext === "png") {
                        mimeType = "image/png";
                    }

                    if (ext === "webp") {
                        mimeType = "image/webp";
                    }

                    // ☁️ CLOUDINARY
                    const uploadRes =
                        await cloudinary.uploader.upload(
                            `data:${mimeType};base64,${base64}`,
                            {
                                folder: "students",

                                gravity:
                                    "auto:face",

                                crop: "fill",

                                width: 300,

                                height: 400,
                            }
                        );

                    imageMap[key!] =
                        uploadRes.secure_url;

                } catch (err) {

                    console.error(
                        "Image upload failed:",
                        fileName
                    );
                }
            }
        }

        // 📅 DATE PARSER
        function parseExcelDate(
            excelDate: any
        ) {

            if (!excelDate) return null;

            if (excelDate instanceof Date) {
                return excelDate;
            }

            if (
                typeof excelDate === "number"
            ) {

                return new Date(
                    (excelDate - 25569) *
                    86400 *
                    1000
                );
            }

            if (
                typeof excelDate === "string"
            ) {

                const parsed =
                    new Date(excelDate);

                if (
                    !isNaN(parsed.getTime())
                ) {
                    return parsed;
                }
            }

            return null;
        }

        // 👨‍🎓 CREATE STUDENTS
        const newStudents = [];

        let skipped = 0;

        for (const row of data) {

            const roll = String(
                row.roll || ""
            ).trim();

            const admissionNo = String(
                row.admissionNo || ""
            ).trim();

            // 🔥 CHECK DUPLICATE
            const alreadyExists =
                await Student.findOne({
                    schoolId,

                    class: String(
                        row.class || ""
                    ),

                    sec:
                        row.sec ||
                        row.section ||
                        "",

                    roll,
                });

            if (alreadyExists) {

                skipped++;

                continue;
            }

            // 🖼️ IMAGE
            const image =
                imageMap[roll] ||
                imageMap[admissionNo] ||
                "";

            if (!image) {
                imageMissing++;
            }

            newStudents.push({

                school:
                    schoolData?.name || "",

                admissionNo,

                sec:
                    row.sec ||
                    row.section ||
                    "",

                name:
                    row.name || "",

                class:
                    String(
                        row.class || ""
                    ),

                roll,

                father:
                    row.father || "",

                mother:
                    row.mother || "",

                phone:
                    row.phone || "",

                address:
                    row.address || "",

                dob: parseExcelDate(
                    row.dob
                ),

                blood:
                    row.blood || "",

                image,

                logo: "",

                signature: "",

                schoolId,

                fileHash,
            });
        }

        // 💾 SAVE
        if (newStudents.length > 0) {

            await Student.insertMany(
                newStudents,
                {
                    ordered: false,
                }
            );
        }

        return NextResponse.json({

            success: true,

            inserted:
                newStudents.length,

            skipped,

            imageMissing,
        });

    } catch (error: any) {

        console.error(
            "Bulk Upload Error:",
            error
        );

        return NextResponse.json(
            {
                success: false,

                message:
                    error.message ||
                    "Bulk upload failed",
            },
            {
                status: 500,
            }
        );
    }
}