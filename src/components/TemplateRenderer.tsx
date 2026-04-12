import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template7 from "./templates/NewEraEnglishSchool";
import BalBhartiSchool from "./templates/BalBhartiSchool";

export default function TemplateRenderer({
    templateId,
    student,
    image,
    logo,
    signature,
    formatDate,
    school
}: any) {

    switch (templateId) {

        case "NewEraEnglishSchool":
            return (
                <Template7
                    student={student}
                    image={image}
                    logo={logo}
                    signature={signature}
                    formatDate={formatDate}
                    school={school}
                />
            );

        case "BalBhartiSchool":
            return (
                <BalBhartiSchool
                    student={student}
                    image={image}
                    logo={logo}
                    signature={signature}
                    formatDate={formatDate}
                    school={school}
                />
            );

        case "template1":
            return <Template1 student={student} formatDate={formatDate} />;

        case "template2":
            return <Template2 student={student} formatDate={formatDate} />;

        default:
            return (
                <h1 className="text-[20px] absolute top-[500px]">Wait....</h1>
            );
    }
}