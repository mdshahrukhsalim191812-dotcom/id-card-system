import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";

import NewEraEnglishSchool from "@/components/downloadingTemplate/NewEraEnglishSchool";
import KarishmaConventSchool from "@/components/downloadingTemplate/KarishmaConventSchool";
import BalBhartiSchool from "@/components/downloadingTemplate/BalBhartiSchool";
import HappyValleySchoolBhagalpur from "@/components/downloadingTemplate/HappyValleySchoolBhagalpur";

export async function POST(request: NextRequest) {
    const data = await request.json();

    const templateId =
        data.students?.[0]?.schoolId?.templateId;

    let pdfDocument;

    switch (templateId) {
        case "KarishmaConventSchool":
            pdfDocument = (
                <KarishmaConventSchool data={data} />
            );
            break;

        case "NewEraEnglishSchool":
            pdfDocument = (
                <NewEraEnglishSchool data={data} />
            );
            break;

        case "BalBhartiSchool":
            pdfDocument = (
                <BalBhartiSchool data={data} />
            );
            break;

        case "HappyValleySchoolBhagalpur":
            pdfDocument = (
                <HappyValleySchoolBhagalpur
                    data={data}
                />
            );
            break;

        default:
            pdfDocument = (
                <NewEraEnglishSchool data={data} />
            );
    }

    const pdfBuffer =
        await renderToBuffer(pdfDocument);

    return new NextResponse(pdfBuffer as any, {
        headers: {
            "Content-Type":
                "application/pdf",
            "Content-Disposition":
                'attachment; filename="id-card.pdf"',
        },
    });
}