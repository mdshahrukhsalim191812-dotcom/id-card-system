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

export default function Template2(
    {
        student, image, logo, formatDate
    }: Props
) {
    const isBlob = logo?.startsWith("blob:");
    return (
        <div
            className="w-[300px] h-[476px] bg-white rounded-2xl shadow-2xl overflow-hidden border relative flex flex-col"
        >

            {/* HEADER */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-950 text-white text-center pt-4 pb-28 relative">

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

                <p className="relative text-[10px] leading-tight w-full top-2  px-0">
                    {student.tag || "Tag Line"}
                </p>

                {/* CURVE EFFECT */}
                <div className="absolute bottom-0 left-0 w-full h-12 bg-white rounded-t-[50%]">
                </div>

            </div>

            {/* PHOTO */}
            <div className="flex justify-center -mt-24 z-10">
                <div className="w-20 h-24 border-2 border-blue-600 bg-white overflow-hidden">
                    {image ? (
                        <img alt="image" src={image} width={100} height={100} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                    )}
                </div>
            </div>

            {/* NAME */}
            <h3 className="text-center font-semibold mt-2 text-sm">
                {student.name || "Student Name"}
            </h3>

            {/* DETAILS TABLE */}
            <div className="px-4 mt-2 text-[10px] space-y-1">

                <div className="flex justify-start border-b">
                    <span className="flex justify-end">Father Name: {student.father || ""}</span>
                </div>

                <div className="flex justify-start border-b">
                    <span className="flex justify-end">Mother Name: {student.mother || ""}</span>
                </div>

                <div className="flex justify-start border-b">
                    <span className="flex justify-end">Roll No: {student.roll || ""}</span>
                </div>

                <div className="flex justify-start border-b">
                    <span className="flex justify-end">D.O.B: {formatDate(student.dob || "")}</span>
                </div>

                <div className="flex justify-start border-b">
                    <span className="flex justify-end">Contact No: {student.phone || ""}</span>
                </div>

                <div className="flex justify-start border-b">
                    <span className="flex justify-end">Blood Group:  {student.blood || ""}</span>
                </div>

                <div className="text-center mt-1">
                    Address: {student.address || "Your Address"}
                </div>
            </div>

            {/* FOOTER */}
            <div className="mt-auto px-4 pb-3 text-[10px] flex justify-between items-center">
                <span>Class: {student.class || "1st"}</span>
                <span className="text-right">
                    ✍️ Principal Sign.
                </span>
            </div>
        </div>
    );
}