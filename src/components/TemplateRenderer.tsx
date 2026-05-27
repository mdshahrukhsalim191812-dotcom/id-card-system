import { forwardRef } from "react";

import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import NewEraEnglishSchool from "./templates/NewEraEnglishSchool";
import BalBhartiSchool from "./templates/BalBhartiSchool";
import HappyValleySchoolBhagalpur from "./templates/HappyValleySchoolBhagalpur";

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
                    <NewEraEnglishSchool
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

            case "HappyValleySchoolBhagalpur":
                content = (
                    <HappyValleySchoolBhagalpur
                        student={student}
                        image={image}
                        logo={logo}
                        signature={signature}
                        formatDate={formatDate}
                        school={school}
                    />
                );
                break;

            default:
                content = (
                    <Template2
                        student={student}
                        formatDate={formatDate}
                        image={image}
                        logo={logo}
                    />
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
                    transformOrigin: "top left",
                    overflow: "hidden",
                }}
            >
                {content}
            </div>
        );
    }
);

export default TemplateRenderer;