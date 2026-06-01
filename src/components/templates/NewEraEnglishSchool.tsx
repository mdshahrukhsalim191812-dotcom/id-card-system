/* eslint-disable @next/next/no-img-element */

type Props = {
    student: any;
    image: string | null;
    logo: string | null;
    signature: string | null;
    formatDate: (date: string) => string;
    school: any;
};

export default function NewEraEnglishSchool({
    student,
    image,
    logo,
    signature,
    formatDate,
    school,
}: Props) {

    return (
        <div
            id="card"
            className="
                relative
                w-[300px]
                h-[476px]
                overflow-hidden
                flex-shrink-0
            "
            style={{
                backgroundImage: `url(${school?.templateImage || "/templates/new-era.jpeg"})`,
                backgroundSize: "300px 476px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >

            {/* STUDENT IMAGE */}
            {image && (
                <img
                    src={image}
                    alt="student"
                    className="
                        absolute
                        top-[111px]
                        left-[96px]
                        w-[107px]
                        h-[132px]
                        object-cover
                        rounded-[10px]
                    "
                />
            )}

            {/* SCHOOL LOGO */}
            {logo && (
                <img
                    src={logo}
                    alt="logo"
                    className="
                        absolute
                        top-[128px]
                        left-[15px]
                        w-[70px]
                        h-[70px]
                        object-contain
                    "
                />
            )}

            {/* STUDENT NAME */}
            <div
                className="
                    absolute
                    top-[248px]
                    left-[20px]
                    w-[260px]
                    h-[32px]
                    flex
                    items-center
                    justify-center
                "
            >
                <span
                    className="
                        text-white
                        font-bold
                        text-[20px]
                        leading-none
                        whitespace-nowrap
                    "
                >
                    {student.name || "----"}
                </span>
            </div>

            {/* LEFT DETAILS */}
            <div
                className="
                    absolute
                    top-[290px]
                    left-[20px]
                    w-[170px]
                    text-[13px]
                    font-bold
                    text-blue-800
                    leading-[18px]
                "
            >

                <p className="m-0">
                    CLASS : {student.class || "-"}
                </p>

                <p className="m-0">
                    D.O.B : {formatDate(student.dob) || "-"}
                </p>

                <p className="m-0 w-[280px]">
                    F. NAME : {student.father || "-"}
                </p>

                <p className="m-0">
                    MOB. : {student.phone || "-"}
                </p>

                <p className="m-0">
                    ADMN. NO : {student.admissionNo || "-"}
                </p>

                <p className="m-0 break-words w-[250px]">
                    ADDRESS : {student.address || "-"}
                </p>

            </div>

            {/* RIGHT DETAILS */}
            <div
                className="
                    absolute
                    top-[290px]
                    right-[20px]
                    w-[80px]
                    text-[13px]
                    font-bold
                    text-blue-800
                    text-left
                "
            >

                <p className="m-0 relative right-[20px]">
                    SEC : {student.sec || "-"}
                </p>

                <p className="m-0 relative top-[-2px] right-[20px] w-[100px]">
                    ROLL NO : {student.roll || "-"}
                </p>

            </div>

            {/* SIGNATURE */}
            {signature && (
                <img
                    src={signature}
                    alt="signature"
                    className="
                        absolute
                        bottom-[18px]
                        right-[18px]
                        w-[80px]
                        h-auto
                        object-contain
                    "
                />
            )}

        </div>
    );
}