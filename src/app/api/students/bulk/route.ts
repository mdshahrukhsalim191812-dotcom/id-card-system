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

        if (!file || file.size === 0) {
            return NextResponse.json(
                { message: "No Excel file uploaded" },
                { status: 400 }
            );
        }

        // 🔥 FILE HASH (prevent duplicate file)
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileHash = crypto.createHash("md5").update(buffer).digest("hex");

        const alreadyUploaded = await Student.findOne({
            fileHash,
            schoolId: user._id,
        });

        if (alreadyUploaded) {
            return NextResponse.json(
                { message: "⚠️ This Excel file already uploaded" },
                { status: 400 }
            );
        }

        // 📊 READ EXCEL
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data: any[] = XLSX.utils.sheet_to_json(sheet);

        const schoolData = await School.findById(user._id);

        // 🖼️ IMAGE MAP
        let imageMap: Record<string, string> = {};
        let imageMissing = 0;

        if (zipFile) {
            const zipBuffer = Buffer.from(await zipFile.arrayBuffer());
            const zip = new AdmZip(zipBuffer);
            const entries = zip.getEntries();

            for (const entry of entries) {
                if (!entry.isDirectory) {
                    const fileName = entry.entryName.split("/").pop();
                    const ext = fileName?.split(".").pop()?.toLowerCase();

                    // ❌ skip invalid files
                    if (!["jpg", "jpeg", "png", "webp"].includes(ext || "")) {
                        continue;
                    }

                    const key = fileName?.split(".")[0]; // roll or admissionNo

                    if (key) {
                        const fileBuffer = entry.getData();
                        const base64 = fileBuffer.toString("base64");

                        let mimeType = "image/jpeg";
                        if (ext === "png") mimeType = "image/png";
                        if (ext === "webp") mimeType = "image/webp";

                        const uploadRes = await cloudinary.uploader.upload(
                            `data:${mimeType};base64,${base64}`,
                            { folder: "students" }
                        );

                        imageMap[key] = uploadRes.secure_url;
                    }
                }
            }
        }

        // 🔥 FETCH ALL EXISTING STUDENTS (OPTIMIZED)
        const existingStudents = await Student.find({
            schoolId: user._id,
        }).select("roll admissionNo");

        const existingSet = new Set(
            existingStudents.map(
                (s) => `${s.roll}-${s.admissionNo}`
            )
        );

        const newStudents = [];
        let skipped = 0;

        for (const row of data) {
            const roll = String(row.roll || "");
            const admissionNo = String(row.admissionNo || "");

            const key = `${roll}-${admissionNo}`;

            if (existingSet.has(key)) {
                skipped++;
                continue;
            }

            const image =
                imageMap[roll] ||
                imageMap[admissionNo] ||
                "";

            if (!image) imageMissing++;

            function parseExcelDate(excelDate: any) {
                if (!excelDate) return null;

                // ✅ If already Date object
                if (excelDate instanceof Date) return excelDate;

                // ✅ If Excel number (serial)
                if (typeof excelDate === "number") {
                    return new Date((excelDate - 25569) * 86400 * 1000);
                }

                // ✅ If string (IMPORTANT FIX)
                if (typeof excelDate === "string") {
                    // Handle formats like 17-01-2014 or 17-Jan-14
                    const parts = excelDate.split(/[-\/]/);

                    if (parts.length === 3) {
                        let [day, month, year] = parts;

                        // Convert month name → number
                        const months: any = {
                            jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
                            jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
                        };

                        if (isNaN(Number(month))) {
                            month = months[month.toLowerCase()];
                        } else {
                            month = Number(month) - 1;
                        }

                        // Fix 2-digit year
                        year = Number(year);
                        if (year < 100) year += 2000;

                        return new Date(Number(year), Number(month), Number(day));
                    }
                }

                return null;
            }

            newStudents.push({
                name: row.name || "",
                class: row.class || "",
                roll,
                admissionNo: String(row.admissionNo || row.admission || ""),
                sec: row.sec || row.section || "",
                father: row.father || "",
                mother: row.mother || "",
                phone: row.phone || "",
                dob: parseExcelDate(row.dob) || null,
                address: row.address || "",
                school: schoolData?.name || "",
                schoolId: user._id,
                image,
                fileHash,
            });
        }

        // 💾 INSERT
        if (newStudents.length > 0) {
            await Student.insertMany(newStudents);
        }

        return NextResponse.json({
            success: true,
            inserted: newStudents.length,
            skipped,
            imageMissing,
        });

    }
    catch (error: any) {
        console.error("Bulk Upload Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message || "Error uploading",
            },
            { status: 500 }
        );
    }
}