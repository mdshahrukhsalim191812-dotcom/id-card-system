import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template7 from "./templates/Template7";
import NewEraEnglishSchool from "../../public/templates/NewEraEnglishSchool.jpeg"

export default function TemplateRenderer({ templateId, student, image, logo, signature, formatDate }: any) {

    switch (templateId) {
        case "NewEraEnglishSchool":
            return (
                <Template7
                    student={student}
                    image={image}
                    logo={logo}
                    signature={signature}
                    formatDate={formatDate}
                />
            );

        case "template1":
            return <Template1 student={student} formatDate={formatDate} />;

        case "template2":
            return <Template2 student={student} formatDate={formatDate} />;

        default:
            return <Template1 student={student} formatDate={formatDate} />;
    }
}