/* eslint-disable @next/next/no-img-element */

type Props = {
    student: any;
    image: string | null;
    logo: string | null;
    signature: string | null;
    formatDate: (date: string) => string;
    school: any;
};

export default function KarishmaConventSchool({
    student,
    image,
    formatDate,
    school,
}: Props) {

    return (

        <div
            id="card"
            className="
        relative
        overflow-hidden
        flex-shrink-0
        bg-white
    "
            style={{
                width: "300px",
                height: "476px",

                minWidth: "300px",
                maxWidth: "300px",

                minHeight: "476px",
                maxHeight: "476px",

                backgroundImage: `url(${school?.templateImage ||
                    "/templates/karishma-convent-school.jpeg"
                    })`,
                backgroundSize: "300px 476px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >

            {/* ================= STUDENT IMAGE ================= */}

            {image && (

                <img
                    src={image}
                    alt="student"
                    className="
                        absolute
                        top-[122px]
                        left-[100px]
                        w-[100px]
                        h-[125px]
                        object-cover
                    "
                />

            )}

            {/* ================= STUDENT NAME ================= */}

            <div
                className="
                    absolute
                    top-[243px]
                    w-[300px]
                    h-[50px]
                    flex
                    items-center
                    justify-center

                    overflow-hidden
                "
            >

                <span
                    className="
                        text-blue-800
                        leading-none
                        text-center
                        tracking-tighter
                        text-[17px]
                    "
                    style={{
                        letterSpacing: "-0.5px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                        fontWeight: "800",
                    }}
                >

                    {student.name || "-----"}

                </span>

            </div>

            {/* ================= LEFT LABELS ================= */}

            <div
                className="
                    absolute
                    top-[298px]
                    left-[18px]
                    text-[11px]
                    leading-[22px]
                    font-extrabold
                   text-[#E53935]
                "
            >

                <p
                    className="relative top-[-15.5px] left-[8px] text-[10px]"
                    style={{
                        letterSpacing: "1.2px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>Admn. No.</p>

                <p className="relative top-[-16.5px] left-[8px] text-[10px]"
                    style={{
                        letterSpacing: "1.2px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>M. Name</p>

                <p className="relative top-[-18px] left-[8px] text-[10px]"
                    style={{
                        letterSpacing: "1px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>F. Name</p>

                <p className="relative top-[-19px] left-[8px] text-[10px]"
                    style={{
                        letterSpacing: "1.2px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>D.O.B.</p>

                <p className="relative top-[-20.5px] left-[8px] text-[10px]"
                    style={{
                        letterSpacing: "1.2px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>Ph. No.</p>

                <p className="relative top-[-22px] left-[8px] text-[10px]"
                    style={{
                        letterSpacing: "1.2px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>Address</p>

            </div>

            {/* ================= COLON ================= */}

            <div
                className="
                    absolute
                    top-[298px]
                    left-[102px]

                    text-[11px]
                    leading-[22px]

                    font-extrabold
                    text-[#E53935]
                "
            >

                <p className="relative top-[-15.5px] left-[-5.5px] text-[10px]"
                    style={{
                        letterSpacing: "1.2px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>:</p>

                <p className="relative top-[-15.5px] left-[-5.5px] text-[10px]"
                    style={{
                        letterSpacing: "1.2px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>:</p>

                <p className="relative top-[-18px] left-[-5.5px] text-[10px]"
                    style={{
                        letterSpacing: "1.2px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>:</p>

                <p className="relative top-[-19px] left-[-5.5px] text-[10px]"
                    style={{
                        letterSpacing: "1.2px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>:</p>

                <p className="relative top-[-20.5px] left-[-5.5px] text-[10px]"
                    style={{
                        letterSpacing: "1.2px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>:</p>

                <p className="relative top-[-22px] left-[-5.5px] text-[10px]"
                    style={{
                        letterSpacing: "1.2px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>:</p>

            </div>

            {/* ================= MAIN DETAILS ================= */}

            <div
                className="
                    absolute
                    top-[298px]
                    left-[115px]

                    w-[160px]

                    text-[11px]
                    leading-[22px]

                    font-black
                    text-black
                "
            >

                {/* ADMISSION + CLASS */}
                <div className="flex items-center gap-4">

                    <span className="relative top-[-15.5px] left-[-8px] text-[10px]"
                        style={{
                            letterSpacing: "1.5px",
                            fontFamily: "Arial",
                            transform: "scaleY(1.65)",
                        }}>
                        {student.admissionNo || "---"}
                    </span>

                </div>


                {/* MOTHER */}
                <p className="relative top-[-16.5px] left-[-9.5px] text-[10px]"
                    style={{
                        letterSpacing: "1.1px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>
                    {student.mother || "---"}
                </p>

                {/* FATHER */}
                <p className="relative top-[-18px] left-[-9.5px] text-[10px]"
                    style={{
                        letterSpacing: "1.1px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>
                    {student.father || "---"}
                </p>

                {/* DOB */}
                <p className="relative top-[-19.5px] left-[-9.5px] text-[10px]"
                    style={{
                        letterSpacing: "1px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>
                    {formatDate(student.dob) || "---"}
                </p>

                {/* PHONE */}
                <p className="relative top-[-20.5px] left-[-9.5px] text-[10px]"
                    style={{
                        letterSpacing: "1px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                    }}>
                    {student.phone || "---"}
                </p>

                {/* ADDRESS */}
                <div
                    className="relative top-[-16.6px] left-[-9.5px] text-[12px] w-[170px]"
                    style={{
                        letterSpacing: "1px",
                        fontFamily: "Arial",
                        lineHeight: "14px",
                    }}
                >

                    {student.address || "---"}

                </div>

            </div>

            {/* ================= RIGHT DETAILS ================= */}

            <div
                className="
        absolute
        top-[281px]
        right-[18px]
    "
            >

                {/* CLASS LABEL */}
                <span
                    className="
            absolute
            top-[4.2px]
            right-[75.3px]
            text-[10px]
           text-[#E53935]
        "
                    style={{
                        letterSpacing: "1.5px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                        fontWeight: "900",
                        width: "55px",
                        textAlign: "right",
                    }}
                >
                    Class
                </span>

                {/* COLON */}
                <span
                    className="
            absolute
            top-[4.2px]
            right-[68px]
            text-[10px]
           text-[#E53935]
        "
                    style={{
                        letterSpacing: "-2px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                        fontWeight: "900",
                    }}
                >
                    :
                </span>

                {/* CLASS VALUE */}
                <span
                    className="
            absolute
            top-[4.2px]
            right-[11px]
            text-[10px]
            text-black
        "
                    style={{
                        letterSpacing: "0px",
                        fontFamily: "Arial",
                        transform: "scaleY(1.65)",
                        fontWeight: "900",
                        width: "50px",
                        textAlign: "left",
                    }}
                >
                    {student.class || "---"}
                </span>

            </div>

        </div >

    );

}