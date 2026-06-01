/*eslint-disable @next/next/no-img-element*/

import { color } from "framer-motion";

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
                        top: "132px",
                        left: "170.5px",
                        width: "105px",
                        height: "132px",
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
                    top: "268.5px",
                    left: "22px",
                    width: "250px"
                }}
            >
                <span
                    style={{
                        fontSize: "21px",
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
            <p style={{ position: "absolute", left: "86px", top: "220px", fontSize: "13.5px", fontWeight: "bold"}} className="text-black">
                {student.admissionNo || "---"}
            </p>

            {/* 🔹 DOB */}
            <p style={{ position: "absolute", left: "86px", top: "238px", fontSize: "13.5px", fontWeight: "bold" }}className="text-black">
                {formatDate(student.dob) || "---"}
            </p>

            {/* 🔹 ROLL */}
            <p style={{ position: "absolute", left: "86px", top: "257px", fontSize: "13.5px", fontWeight: "bold" }} className="text-black">
                {student.roll || "---"}
            </p>

            {/* 🔹 FATHER */}
            <p style={{ position: "absolute", left: "22px", top: "315px", fontSize: "13.5px", fontWeight: "bold" }} className="text-black">
                {student.father || "---"}
            </p>

            {/* 🔹 MOTHER */}
            <p style={{ position: "absolute", left: "22px", top: "345px", fontSize: "13.5px", fontWeight: "bold" }} className="text-black">
                {student.mother || "---"}
            </p>

            {/* 🔹 PHONE */}
            <p style={{ position: "absolute", left: "22px", top: "375px", fontSize: "13.5px", fontWeight: "bold" }} className="text-black">
                {student.phone || "---"}
            </p>

            {/* 🔹 ADDRESS */}
            <p style={{
                position: "absolute",
                left: "22px",
                top: "405px",
                width: "200px",
                fontSize: "13.5px",
                fontWeight: "bold",
                lineHeight: "16px",
                wordBreak: "break-word"
            }} className="text-black">
                {student.address || "---"}
            </p>

            {/* 🔹 CLASS */}
            <p style={{
                position: "absolute",
                left: "192px",
                top: "350px",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#1e40af"
            }} className="text-black">
                {student.class || "---"}
            </p>

            <p style={{
                position: "absolute",
                left: "240px",
                top: "350px",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#FFF100"
            }} className="text-black"
            >
               /{student.sec || "---"}
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