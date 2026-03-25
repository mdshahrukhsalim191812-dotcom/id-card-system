/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

type Student = {
    school: "",
    tag: "",
    name: "",
    roll: "",
    class: "",
    father: "",
    mother: "",
    phone: "",
    address: "",
    dob: "",
    photo: "",
    blood: ""
}

type Props = {
    student: Student;
    image: string | null;
    logo: string | null;
    signature: string | null;
    formatDate: (date: string) => string;
};

export default function Template7({
    student,
    image,
    logo,
    signature,
    formatDate,
}: Props) {
    const isBlobImage = image?.startsWith("blob:");
    const isBlobLogo = logo?.startsWith("blob:");
    const isBlobSignature = signature?.startsWith("blob:");

    return (
        <div className="w-[250px] h-[380px] relative overflow-hidden shadow-2xl">

            {/* LIGHT EFFECT */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.4)_10%,transparent_60%)] opacity-40"></div>

            <div className="relative">

                {/* HEADER */}
                <div className="bg-gradient-to-r from-green-700 to-lime-500 text-white text-center pt-[12px] pb-[18px]">
                    <h1 className="text-[20px] font-bold tracking-tight">
                        {student.school || "BAL BHARTI VIDYALAYA"}
                    </h1>
                </div>

                {/* 🔥 YELLOW BADGE (OVERLAP EFFECT) */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[4px] 
                  bg-yellow-400 text-red-700 text-[10px] 
                  font-bold px-[8px] -py-[2px] rounded-[3px] shadow-md whitespace-nowrap">
                    (Affiliated to C.B.S.E., Delhi)
                </div>

            </div>

            {/* PINK STRIP */}
            <div className="bg-gradient-to-r from-pink-200 via-pink-600  to-pink-800 text-white text-[11px] text-center px-[13px] font-bold">
                Affiliation No. 330552 / School No. 65538
            </div>

            {/* BODY */}
            <div className="relative p-3">

                {/* LOGO LEFT */}
                <div className="absolute left-[20px] top-[4px] w-[80px] h-[80px] rounded-full overflow-hidden border-[3px] border-green-500 bg-gray-200 shadow-l z-10">
                    {logo &&
                        (isBlobLogo ? (
                            <img src={logo} alt="logo" className="w-full h-full object-cover z-10" />
                        ) : (
                            <Image src={logo} width={80} height={80} alt="logo"/>
                        ))}
                </div>

                {/* SESSION VERTICAL */}
                <div className="absolute left-0 top-[110px] rotate-[-90deg] text-[10px] font-extrabold text-blue-900">
                    <div className="relative left-[62px] top-[79.5px]">
                        SESSION 2026-27
                    </div>;
                </div>

                <div className="absolute">
                    {/* STUDENT ID TEXT */}
                    <h2 className="relative text-center text-[14px] font-semibold left-[130px] -top-[12px]">
                        Student Id
                    </h2>
                </div>

                {/* PHOTO BOX */}
                <div className="absolute justify-end mt-0 pr-3">
                    <div className="relative w-[110px] h-[140px] border-[1px] border-pink-500 left-[110px] top-[6px] z-10 bg-gray-200">
                        <div className="relative bottom-[24px]">
                            {image &&
                                (isBlobImage ? (
                                    <img src={image} alt="image" className="w-full h-full object-cover" />
                                ) : (
                                    <Image src={image} width={100} height={100} alt="student" />
                                ))}
                        </div>
                    </div>
                </div>

                {/* DETAILS CARD */}
                <div className="absolute">
                    <div className="relative mt-6 bg-white shadow-lg pt-[27px] pl-[7px] pb-[25px] w-[226px] h-[203px] top-[50px]">

                        <div className="relative text-[10px] text-blue-900 font-bold top-[3px]">

                            <div className="flex gap-2">
                                <span>Class :</span>
                                <span>{student.class || "--"}</span>
                            </div>

                            <div className="flex gap-2">
                                <span>Sec :</span>
                                <span>--</span>
                            </div>

                            <div className="flex gap-2">
                                <span>Roll No :</span>
                                <span>{student.roll || "--"}</span>
                            </div>

                            <div className="flex gap-2">
                                <span>D.O.B :</span>
                                <span>{formatDate(student.dob) || "--"}</span>
                            </div>
                        </div>

                        {/* RED DOTS */}
                        <div className="flex justify-center gap-[2px] my-[8px]">
                            <div className="w-[7px] h-[5px] bg-red-600 top-[12px]"></div>
                            <div className="w-[7px] h-[5px] bg-red-600"></div>
                            <div className="w-[7px] h-[5px] bg-red-600"></div>
                            <div className="w-[7px] h-[5px] bg-red-600"></div>
                        </div>

                        {/* MORE DETAILS */}
                        <div className="text-[10px] text-blue-900 font-bold">

                            <div className="flex gap-2">
                                <span>Admn. No :</span>
                                <span>----</span>
                            </div>

                            <div className="flex gap-2">
                                <span>F. Name :</span>
                                <span>{student.father || "---"}</span>
                            </div>

                            <div className="flex gap-2">
                                <span>M. Name :</span>
                                <span>{student.mother || "---"}</span>
                            </div>

                            <div className="flex gap-2">
                                <span>Ph. No :</span>
                                <span>{student.phone || "---"}</span>
                            </div>

                            <div>
                                <span>Address : </span>
                                <span>
                                    {student.address || "---"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SIGNATURE */}
                <div className="absolute bottom-3 right-4 text-center">
                    
                        {signature &&
                            (isBlobSignature ? (
                                <img src={signature} alt="signature" className="w-16 h-6 mx-auto z-20" />
                            ) : (
                                <Image src={signature} width={60} height={20} alt="sign" />
                            ))}
                    <p className="text-red-600 relative font-bold text-[11px] top-[278px] right-[5px]">Principal</p>
                </div>

            </div>

        </div>
    );
}