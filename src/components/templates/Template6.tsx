/*eslint-disable @next/next/no-img-element*/
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
    schoolAddress: "",
    dob: "",
    photo: "",
    blood: ""
}

type Props = {
    student: Student;
    image: string | null
    logo: string | null
    signature: string | null
    formatDate: (date: string) => string
}

export default function Template6(
    {
        student, image, logo, signature, formatDate
    }: Props
) {
    const isBlobImage = image?.startsWith("blob:");
    const isBlobLogo = logo?.startsWith("blob:");
    const isBlobSignature = signature?.startsWith("blob:");
    return (
        <>
            <div className="w-[260px] h-[420px] rounded-xl shadow-xl overflow-hidden relative">

                {/* 🔵 HEADER */}
                <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white text-center py-2 px-2 relative z-20">
                    <h2 className="text-[18px] font-bold">
                        {student.school || "NEW ERA ENGLISH SCHOOL"}
                    </h2>

                    <p className="text-[8px] italic">
                        {student.tag || `"An English medium School with Islamic Principles"`}
                    </p>

                    <p className="text-[12px] text-yellow-400 font-bold">
                        Add: {student.schoolAddress || "Near Golambar Chowk, Champanagar Bhagalpur"}
                    </p>

                    <p className="text-[10px] text-red-400 font-bold">
                        Contact No: {student.phone || "7070196044"}
                    </p>
                </div>

                {/* 🔵 CURVE SECTION */}
                <div className="relative bg-gradient-to-b from-blue-500 to-white pt-10 pb-4">

                    {/* 🌊 CURVE (NO WHITE LINE FIXED) */}
                    <div className="absolute -top-[6px] left-0 w-full z-10">
                        <svg
                            viewBox="0 40 400 100"
                            className="w-full h-[70px]"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#172554" /> {/* blue-950 */}
                                    <stop offset="100%" stopColor="#1e40af" /> {/* blue-800 */}
                                </linearGradient>
                            </defs>

                            <path
                                d="M0,80 C150,140 350,20 500,80 L500,0 L0,0 Z"
                                fill="url(#waveGradient)"
                            />
                        </svg>
                    </div>

                    {/* LOGO */}
                    <div className="absolute left-3 top-[36px] w-[60px] h-[60px] rounded-full overflow-hidden bg-white border z-10">
                        {logo &&
                            (isBlobLogo ? (
                                <img src={logo} alt="logo" className="w-full h-full object-cover" />
                            ) : (
                                <Image src={logo} width={60} height={60} alt="logo" />
                            ))}
                    </div>

                    {/* SESSION */}
                    <div className="absolute right-3 top-[46px] text-[12px] text-gray-700 font-bold">
                        SESSION <br /> 2026-2027
                    </div>

                    {/* PHOTO */}
                    <div className="relative justify-center bottom-[35px] left-[82px] z-10">
                        <div className="w-24 h-28 border-2 border-indigo-400 rounded-md overflow-hidden bg-gray-200 z-20">
                            {image &&
                                (isBlobImage ? (
                                    <img src={image} alt="image" className="w-full h-full object-cover" />
                                ) : (
                                    <Image src={image} width={100} height={100} alt="student" />
                                ))}
                        </div>
                    </div>
                </div>

                {/* 🟢 NAME STRIP */}
                <div className=" absolute flex justify-center -mt-3">
                    <div className="bg-green-900 text-white w-[200px] text-center py-1 rounded-md shadow-md z-10 relative bottom-[30px] left-[30px]">
                        <h3 className="text-sm font-bold">
                            {student.name || "Student Name"}
                        </h3>
                    </div>
                </div>

                {/* 🔴 DETAILS */}
                <div className="bg-gradient-to-b from-white to-green-300 px-[10px] pb-[40px] text-[11px] space-y-[2px]">

                    <div className="flex justify-between">
                        <span className="text-red-500 font-bold">Class:</span>
                        <span className="text-blue-900 font-bold">
                            {student.class}
                        </span>

                        <span className="text-red-500 font-bold">Roll No:</span>
                        <span className="text-blue-900 font-bold">
                            {student.roll}
                        </span>
                    </div>

                    <div>
                        <span className="text-red-500 font-bold">D.O.B: </span>
                        <span className="text-blue-900 font-bold">
                            {formatDate(student.dob)}
                        </span>
                    </div>

                    <div>
                        <span className="text-red-500 font-bold">Father: </span>
                        <span className="text-blue-900 font-bold">
                            {student.father}
                        </span>
                    </div>

                    <div>
                        <span className="text-red-500 font-bold">Mobile: </span>
                        <span className="text-blue-900 font-bold">
                            {student.phone}
                        </span>
                    </div>

                    <div>
                        <span className="text-red-500 font-bold">Address: </span>
                        <span className="text-blue-900 font-bold">
                            {student.address || "Student Address"}
                        </span>
                    </div>
                </div>

                {/* SIGN */}
                <div className="absolute bottom-8 right-3 text-[10px] text-green-700 font-semibold bottom-[20px]">
                    {signature &&
                        (isBlobSignature ? (
                            <img alt="signature" src={signature} className="w-[70px] h-[20px] relative" />
                        ) : (
                            <Image src={signature} width={70} height={20} alt="signature" />
                        ))}
                    <p className="relative top-[1px]">Principal Sign.</p>
                </div>

                {/* FOOTER */}
                <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-green-700 to-blue-700"></div>
            </div>
        </>
    );
}