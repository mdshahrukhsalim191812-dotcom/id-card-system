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
    formatDate: (date: string) => string
}

export default function Template3(
    {
        student, image, logo, formatDate
    }: Props
) {
    const isBlob = image?.startsWith("blob:");
    return (
        <div className="w-[260px] h-[420px] bg-white rounded-xl shadow-xl overflow-hidden relative border">

            {/* 🔵 TOP HEADER */}
            <div className="bg-gradient-to-b from-blue-800 to-indigo-900 text-white text-center pt-4 pb-[50px] relative">

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

                <div>
                    <p className="text-[10px] bg-yellow-400 text-black inline-block px-2 rounded mt-[0px]">
                        (An English Medium School)
                    </p>
                </div>

                <p className="text-[9px] mt-1">
                    {student.tag || "Tag Line"}
                </p>

                {/* CURVE SHAPE */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg viewBox="0 0 500 100" className="w-full h-20">
                        <path
                            d="M0,50 C150,120 350,0 500,50 L500,100 L0,100 Z"
                            fill="white"
                        />
                    </svg>
                </div>
            </div>

            {/* 🖼 PHOTO */}
            <div className="flex justify-center -mt-10 relative z-10">
                <div className="w-20 h-24 border-2 border-blue-700 rounded-lg overflow-hidden bg-white">
                    {image &&
                        (isBlob ?
                            (<img alt="image" width={100} height={100} src={image} className="relative bottom-0 w-full h-full object-contain rounded-3xl" />)
                            :
                            (<Image src={image} width={100} height={100} alt="image" />)
                        )
                    }
                </div>
            </div>

            {/* 🔴 ID STRIP */}
            <div className="absolute justify-between mt-2 px-2">
                <span className="bg-red-500 text-white text-[9px] px-2 py-[2px] rounded relative bottom-[60px]">
                    IDENTITY CARD
                </span>
                <span className="bg-red-500 text-white text-[9px] px-2 py-[2px] rounded
                relative bottom-[60px] left-[86px]">
                    IDENTITY CARD
                </span>
            </div>

            {/* 👤 NAME */}
            <h3 className="text-center text-red-600 font-bold text-sm mt-2">
                {student.name || "STUDENT NAME"}
            </h3>

            {/* 📋 DETAILS */}
            <div className="px-4 mt-2 text-[10px] text-gray-700 space-y-1">

                <div className="flex justify-between">
                    <span>Father Name:</span>
                    <span>{student.father || "---------"}</span>
                </div>

                <div className="flex justify-between">
                    <span>Mother Name:</span>
                    <span>{student.mother || "---------"}</span>
                </div>

                <div className="flex justify-between">
                    <span>Class:</span>
                    <span>{student.class || "----------"}</span>
                </div>

                <div className="flex justify-between">
                    <span>Roll No:</span>
                    <span>{student.roll || "----------"}</span>
                </div>

                <div className="flex justify-between">
                    <span>D.O.B:</span>
                    <span>{formatDate(student.dob || "0000/00/00")}</span>
                </div>

                <div className="flex justify-between">
                    <span>Address:</span>
                    <span className="text-right">
                        {student.address || "Your Address Here"}
                    </span>
                </div>
            </div>

            {/* 📞 PHONE BADGE */}
            <div className="flex justify-center mt-3 absolute">
                <div className="bg-yellow-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 relative top-[4px] left-[70px]">
                    📞 {student.phone || "0000000000"}
                </div>
            </div>

            {/* 🔻 FOOTER */}
            <div className="absolute bottom-0 left-0 w-full bg-red-600 text-white text-[9px] text-center py-2 rounded-t-[40px]">
                Please report on this number in case of emergency.
            </div>

        </div >
    );
}