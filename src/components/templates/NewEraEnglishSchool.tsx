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
                    style={{
                        border: "2px solid red",
                        background: "rgba(255,0,0,0.1)"
                    }}
                />
            )}

            {/* STUDENT NAME */}
            <div
                style={{
                    position: "absolute",
                    top: "248px",
                    left: "20px",
                    width: "260px",
                    height: "32px",

                    background: "#006b2f",

                    textAlign: "center",

                    color: "white",

                    fontSize: "20px",

                    fontWeight: "700",

                    lineHeight: "32px",
                }}
            >
                {}
            </div>

            {/* LEFT DETAILS */}
            <div
                className="
        absolute
        top-[290px]
        left-[20px]
        text-[13px]
        font-normal
        text-blue-800
        "
                style={{
                    border: "2px solid red",
                    background: "rgba(255,0,0,0.1)"
                }}
            >

                <div className="absolute top-[0px] left-[0px] whitespace-nowrap">
                    CLASS : {student.class || "-"}
                </div>

                <div className="absolute top-[18px] left-[0px] whitespace-nowrap">
                    D.O.B : {formatDate(student.dob) || "-"}
                </div>

                <div className="absolute top-[36px] left-[0px] whitespace-nowrap">
                    F. NAME : {student.father || "-"}
                </div>

                <div className="absolute top-[54px] left-[0px] whitespace-nowrap">
                    MOB. : {student.phone || "-"}
                </div>

                <div className="absolute top-[72px] left-[0px] whitespace-nowrap">
                    ADMN. NO : {student.admissionNo || "-"}
                </div>

                <div
                    className="
            absolute
            top-[90px]
            left-[0px]
            w-[250px]
            leading-[16px]
            break-words
        "
                >
                    ADDRESS : {student.address || "-"}
                </div>

            </div>

            {/* RIGHT DETAILS */}
            <div
                className="
        absolute
        top-[290px]
        right-[20px]
        text-[13px]
        font-bold
        text-blue-800
    "
                style={{
                    border: "2px solid red",
                    background: "rgba(255,0,0,0.1)"
                }}
            >

                <div
                    className="
            absolute
            top-[0px]
            right-[0px]
            whitespace-nowrap
        "
                >
                    SEC : {student.sec || "-"}
                </div>

                <div
                    className="
            absolute
            top-[18px]
            right-[0px]
            whitespace-nowrap
        "
                >
                    ROLL NO : {student.roll || "-"}
                </div>

            </div>
        </div>
    );
}