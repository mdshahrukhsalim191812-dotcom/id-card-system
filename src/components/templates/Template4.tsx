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

export default function Template4(
    {
        student, image, logo, signature, formatDate
    }: Props
) {
    const isBlob = image?.startsWith("blob:");
    const isBlobSignature = signature?.startsWith("blob:");

    return (
        <div className="w-[260px] h-[420px] bg-white rounded-xl shadow-xl overflow-hidden relative border">

            {/* 🔵 HEADER */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-950 text-white text-center pt-4 pb-16 relative">

                <div className="flex items-center justify-center gap-2 px-4 text-center">

                    {/* LOGO */}
                    <div className="relative w-10 h-10 bg-white rounded-full items-center justify-start text-blue-700 text-xs font-bold">
                        {logo &&
                            (isBlob ?
                                (<img alt="logo" width={100} height={100} src={logo} className="relative bottom-0 w-full h-full object-contain rounded-3xl" />)
                                :
                                (<Image src={logo} width={100} height={100} alt="logo" />)
                            )
                        }
                    </div>

                    {/* SCHOOL NAME */}
                    <div className="leading-tight">
                        <h2 className="relative text-x font-bold break-words">
                            {student.school || "School Name"}
                        </h2>
                    </div>
                </div>

                <p className="text-[10px] bg-cyan-400 text-black inline-block px-2 rounded mt-1">
                    {student.tag || "Tag Line / School Address"}
                </p>

                {/* CURVE SHAPES */}
                <div className="absolute bottom-0 left-0 w-full h-16">
                    <div className="absolute w-[120%] h-20 bg-gradient-to-r from-blue-800 to-blue-950 rounded-b-[50%] -left-5"></div>
                    <div className="absolute w-[120%] h-20 bg-yellow-400 rounded-b-[50%] -left-10 top-6"></div>
                </div>
            </div>

            {/* 🖼 PHOTO */}
            <div className="flex justify-center -mt-12 relative z-10">
                <div className="w-24 h-28 border-4 border-white rounded-xl shadow-md overflow-hidden bg-white">
                    {image ? (
                        <img src={image} alt="image" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                    )}
                </div>
            </div>

            {/* 🟦 NAME STRIP */}
            <div className="mt-3 px-2">
                <div className="bg-gradient-to-r from-teal-500 to-blue-700 text-white text-center py-1 rounded-r-full relative">
                    <span className="font-bold text-sm">
                        {student.name || "Student Name"}
                    </span>
                </div>
            </div>

            {/* 🔵 CLASS BADGE */}
            <div className="flex justify-center mt-1">
                <div className="bg-blue-900 text-white text-xs px-4 py-1 rounded-full">
                    Class - {student.class || "X"}
                </div>
            </div>

            {/* 📋 DETAILS */}
            <div className="px-4 mt-0 text-[11px] text-gray-700 space-y-1">

                <div className="flex justify-between">
                    <span className="text-blue-600 font-semibold">Father Name:</span>
                    <span>{student.father || ""}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-blue-600 font-semibold">Mother Name:</span>
                    <span>{student.mother || ""}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-blue-600 font-semibold">Roll No:</span>
                    <span>{student.roll || ""}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-blue-600 font-semibold">D.O.B</span>
                    <span>{formatDate(student.dob || "")}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-blue-600 font-semibold">Address</span>
                    <span>{student.address || ""}</span>
                </div>
            </div>

            {/* 🔶 FOOTER */}
            <div className="absolute bottom-0 left-0 w-full h-[40px]">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-600 text-white text-center text-[10px] py-1 rounded-t-[30px]">
                    <span className="relative top-[12px]">Principal Signature: </span> 
                    {signature &&
                        (isBlobSignature ? (
                            <img alt="signature" src={signature} className="w-[70px] h-[20px] relative bottom-[40x] left-[180px]" />
                        ) : (
                            <Image src={signature} width={70} height={20} alt="signature" />
                        ))}
                </div>
            </div>

            {/* 🪪 SIDE TEXT */}
            <div className="absolute left-[0px] top-1/2 -translate-y-1/2 rotate-[-90deg] text-[20px] text-gray-300 font-bold tracking-widest">
                ID CARD
            </div>

        </div>
    );
}