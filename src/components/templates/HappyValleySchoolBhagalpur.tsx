/*eslint-disable @next/next/no-img-element*/

type Props = {
    student: any;
    image: string | null;
    logo: string | null;
    signature: string | null;
    formatDate: (date: string) => string;
    school: any;
};

export default function HappyValleySchoolBhagalpur({
    student,
    image,
    logo,
    signature,
    formatDate,
    school
}: Props) {

    return (
        <div
            id="card"
            style={{
                width: "300px",
                height: "476px",
                position: "relative",
                overflow: "hidden",
                backgroundImage: `url(${school?.templateImage || "/templates/happy-valley-school-bhagalpur.jpg"})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                boxSizing: "border-box"
            }}
        >

            {/* 🔹 STUDENT IMAGE */}
            {image && (
                <img
                    src={image}
                    alt="student"
                    style={{
                        position: "absolute",
                        top: "130px",
                        left: "165px",
                        width: "105px",
                        height: "130px",
                        objectFit: "cover",
                        border: "2px solid #fff"
                    }}
                />
            )}

            {/* 🔹 LOGO */}
            {logo && (
                <img
                    src={logo}
                    alt="logo"
                    style={{
                        position: "absolute",
                        top: "125px",
                        left: "15px",
                        width: "70px",
                        height: "70px",
                        objectFit: "contain"
                    }}
                />
            )}

            {/* 🔹 NAME */}
            <div
                style={{
                    position: "absolute",
                    top: "268px",
                    left: "22px",
                    width: "250px"
                }}
            >
                <span
                    style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: "#fff",
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                >
                    {student.name || "----"}
                </span>
            </div>

            {/* 🔹 ADMISSION */}
            <p style={{ position: "absolute", left: "86px", top: "220px", fontSize: "14px", fontWeight: "bold" }}>
                {student.admissionNo || "---"}
            </p>

            {/* 🔹 DOB */}
            <p style={{ position: "absolute", left: "86px", top: "235px", fontSize: "14px", fontWeight: "bold" }}>
                {formatDate(student.dob) || "---"}
            </p>

            {/* 🔹 ROLL */}
            <p style={{ position: "absolute", left: "86px", top: "250px", fontSize: "14px", fontWeight: "bold" }}>
                {student.roll || "---"}
            </p>

            {/* 🔹 FATHER */}
            <p style={{ position: "absolute", left: "22px", top: "285px", fontSize: "14px", fontWeight: "bold" }}>
                {student.father || "---"}
            </p>

            {/* 🔹 MOTHER */}
            <p style={{ position: "absolute", left: "22px", top: "300px", fontSize: "14px", fontWeight: "bold" }}>
                {student.mother || "---"}
            </p>

            {/* 🔹 PHONE */}
            <p style={{ position: "absolute", left: "22px", top: "315px", fontSize: "14px", fontWeight: "bold" }}>
                {student.phone || "---"}
            </p>

            {/* 🔹 ADDRESS */}
            <p style={{
                position: "absolute",
                left: "22px",
                top: "330px",
                width: "200px",
                fontSize: "14px",
                fontWeight: "bold",
                lineHeight: "16px",
                wordBreak: "break-word"
            }}>
                {student.address || "---"}
            </p>

            {/* 🔹 CLASS */}
            <p style={{
                position: "absolute",
                left: "200px",
                top: "350px",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#1e40af"
            }}>
                {student.class || "---"}
            </p>

            {/* 🔹 SIGNATURE */}
            {signature && (
                <img
                    src={signature}
                    alt="signature"
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        width: "80px"
                    }}
                />
            )}

        </div>
    );
}