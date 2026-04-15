import { forwardRef } from "react";

import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template7 from "./templates/NewEraEnglishSchool";
import BalBhartiSchool from "./templates/BalBhartiSchool";

const TemplateRenderer = forwardRef(
    (
        {
            templateId,
            student,
            image,
            logo,
            signature,
            formatDate,
            school,
        }: any,
        ref: any
    ) => {

        let content = null;

        switch (templateId) {
            case "NewEraEnglishSchool":
                content = (
                    <Template7
                        student={student}
                        image={image}
                        logo={logo}
                        signature={signature}
                        formatDate={formatDate}
                        school={school}
                    />
                );
                break;

            case "BalBhartiSchool":
                content = (
                    <BalBhartiSchool
                        student={student}
                        image={image}
                        logo={logo}
                        signature={signature}
                        formatDate={formatDate}
                        school={school}
                    />
                );
                break;

            case "template1":
                content = (
                    <Template1
                        student={student}
                        formatDate={formatDate}
                    />
                );
                break;

            case "template2":
                content = (
                    <Template2
                        student={student}
                        formatDate={formatDate}
                    />
                );
                break;

            default:
                content = (
                    <h1 className="text-xl text-center">
                        Loading template...
                    </h1>
                );
        }

        // 🔥 IMPORTANT WRAPPER FOR PDF
        return (
            <div
                ref={ref}
                style={{
                    width: "300px",
                    height: "476px",
                    minWidth: "300px",
                    minHeight: "476px",
                    maxWidth: "300px",
                    maxHeight: "476px",
                    transform: "scale(1)",
                    transformOrigin: "top left",
                    backgroundColor: "white",
                    overflow: "hidden",
                }}
            >
                {content}
            </div>
        );
    }
);

export default TemplateRenderer;