import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";

import NewEraEnglishSchool from "@/components/downloadingTemplate/NewEraEnglishSchool";
import KarishmaConventSchool from "@/components/downloadingTemplate/KarishmaConventSchool";
import BalBhartiSchool from "@/components/downloadingTemplate/BalBhartiSchool";
import HappyValleySchoolBhagalpur from "@/components/downloadingTemplate/HappyValleySchoolBhagalpur";

export async function POST(request: NextRequest) {
    const data = await request.json();

    const templateId =
        data.students?.[0]?.schoolId?.templateId;

    let TemplateComponent: any =
        NewEraEnglishSchool;

    switch (templateId) {
        case "KarishmaConventSchool":
            TemplateComponent =
                KarishmaConventSchool;
            break;

        case "NewEraEnglishSchool":
            TemplateComponent =
                NewEraEnglishSchool;
            break;

        case "BalBhartiSchool":
            TemplateComponent =
                BalBhartiSchool;
            break;

        case "HappyValleySchoolBhagalpur":
            TemplateComponent =
                HappyValleySchoolBhagalpur;
            break;

        default:
            TemplateComponent =
                NewEraEnglishSchool;
    }

    const pdfBuffer = await renderToBuffer(
        React.createElement(
            TemplateComponent,
            {
                data,
            }
        )
    );

    return new NextResponse(pdfBuffer, {
        headers: {
            "Content-Type":
                "application/pdf",
            "Content-Disposition":
                'attachment; filename="id-card.pdf"',
        },
    });
}