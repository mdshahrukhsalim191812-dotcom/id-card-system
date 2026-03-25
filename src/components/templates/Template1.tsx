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

export default function Template1({ student, image, logo, formatDate }: Props) {

    const isBlob = logo?.startsWith("blob:");

    return (
        <div className="w-[260px] h-[420px] bg-white rounded-xl shadow-xl overflow-hidden relative">

            {/* LEFT DESIGN STRIP */}
            <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-b from-blue-700 to-purple-700"></div>

            {/* TOP SECTION */}
            <div className="flex items-center justify-center gap-2 px-4 text-center mt-2">

                {/* LOGO */}
                <div className="w-10 h-10 bg-white rounded-3xl flex items-center justify-center">
                    {logo && (
                        isBlob ? (
                            <img src={logo} alt="logo" className="w-full h-full object-contain rounded-3xl z-10" />
                        ) : (
                            <Image src={logo} width={40} height={40} alt="logo" />
                        )
                    )}
                </div>

                {/* SCHOOL NAME */}
                <h2 className="text-xs font-bold break-words">
                    {student.school || "School Name"}
                </h2>
            </div>

            <p className="text-[8px] text-center px-2 left-10 z-10">
                {student.tag || "Tag Line"}
            </p>

            {/* PHOTO */}
            <div className="flex justify-center mt-3">
                <div className="w-20 h-20 border-2 border-blue-500 rounded-md overflow-hidden">
                    {image ? (
                        <img src={image} alt="image" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                    )}
                </div>
            </div>

            {/* NAME STRIP */}
            <div className="bg-blue-700 text-center mt-3 py-1">
                <h3 className="text-yellow-400 font-bold text-sm">
                    {student.name || "STUDENT NAME"}
                </h3>
            </div>

            {/* CLASS BADGE */}
            <div className="absolute right-2 top-[200px] bg-red-100 border border-red-400 px-2 text-xs rounded">
                Class: {student.class || "0"}
            </div>

            {/* DETAILS */}
            <div className="pl-16 pr-3 mt-3 text-[11px] space-y-1 text-gray-700">
                <p><b>Roll No:</b> {student.roll}</p>
                <p><b>Father:</b> {student.father}</p>
                <p><b>Mother:</b> {student.mother}</p>
                <p><b>DOB:</b> {formatDate(student.dob)}</p>
                <p><b>Mobile:</b> {student.phone}</p>
                <p><b>Aadhar:</b> 0000-0000-0000</p>
                <p><b>Blood:</b> {student.blood}</p>
            </div>

            {/* FOOTER */}
            <div className="absolute bottom-0 left-0 w-full bg-orange-500 text-white text-[10px] text-center py-1">
                {student.address || "Address"}
            </div>

        </div>
    );
}