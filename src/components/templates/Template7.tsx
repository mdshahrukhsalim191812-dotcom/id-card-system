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

export default function Template7(
    {
        student, image, logo, signature, formatDate
    }: Props
) {
    const isBlobImage = image?.startsWith("blob:");
    const isBlobLogo = logo?.startsWith("blob:");
    const isBlobSignature = signature?.startsWith("blob:");
    return (
        <>
            <div className="w-[260px] h-[420px] bg-white rounded-xl shadow-xl overflow-hidden relative border">

                {/* 🔵 HEADER */}
                <div className="bg-blue-700 text-white text-center pt-[8px] text-[18px] font-bold">
                    {student.school || "ST. PAUL'S SCHOOL"}
                </div>

                {/* 🔵 ADDRESS */}
                <div className="bg-blue-300 text-center text-[9px] px-2 py-1 leading-tight">
                    {student.tag ||
                        "FORT HOUSE, P.O.- CHAMPANAGAR, BHAGALPUR, BIHAR - 812004"}
                </div>

                {/* 🔴 SESSION */}
                <div className="px-3 py-[] text-red-600 font-extrabold text-[14px] bg-yellow-100 w-[90px]">
                    2025 - 26
                </div>

                {/* 🟡 MAIN SECTION */}
                <div className="flex px-3 gap-2">

                    {/* 🔵 PHOTO */}
                    <div className="w-[85px] h-[85px] rounded-full overflow-hidden border-[2px] border-blue-700">
                        {image &&
                            (isBlobImage ? (
                                <img src={image} alt="student" className="w-full h-full object-cover" />
                            ) : (
                                <Image src={image} width={85} height={85} alt="student" />
                            ))}
                    </div>

                    {/* 🟢 RIGHT SIDE */}
                    <div className="flex-1 text-[11px]">

                        {/* LOGO */}
                        <div className="flex justify-end mb-1">
                            <div className="w-[40px] h-[40px]">
                                {logo &&
                                    (isBlobLogo ? (
                                        <img src={logo} alt="logo" className="w-[60px] h-[70px] object-contain" />
                                    ) : (
                                        <Image src={logo} width={60} height={60} alt="logo" />
                                    ))}
                            </div>
                        </div>

                        <div>
                            <span className="font-bold text-blue-700">Std.: </span>
                            {student.class || "VIII - A"}
                        </div>

                        <div>
                            <span className="font-bold text-blue-700">Adm No.: </span>
                            {student.roll || "4287"}
                        </div>

                        <div>
                            <span className="font-bold text-blue-700">D.O.B: </span>
                            {formatDate(student.dob) || "29-03-2012"}
                        </div>

                        {/* SIGN */}
                        <div className="mt-2 text-right absolute bottom-2 right-3">
                            {signature &&
                                (isBlobSignature ? (
                                    <img src={signature} className="w-[70px] h-[20px]" />
                                ) : (
                                    <Image src={signature} width={50} height={10} alt="sign" />
                                ))}
                            <p className="text-[9px] text-green-700">Principal</p>
                        </div>
                    </div>
                </div>

                {/* 🟢 NAME */}
                <div className="text-center font-semibold text-blue-900 py-[3px] text-[15px] bg-yellow-50">
                    {student.name || "ALFIYA AFTAB"}
                </div>

                {/* 👨‍👩‍👧 PARENTS */}
                <div className="px-3 text-[11px]">
                    <div> {student.mother || "ARISHA YASMIN"} </div>
                    <div> {student.father || "MD AFTAB ALAM"} </div>
                </div>

                {/* 🟦 ADDRESS BLOCK */}
                <div className="bg-blue-200 mt-2 px-3 py-2 text-[10px] text-center leading-tight">
                    {student.address ||
                        "BHAIRO LAL LANE P.O. CHAMPANAGAR P.S. NATHNAGAR BHAGALPUR"}
                </div>

                {/* 📞 FOOTER */}
                <div className="text-center text-[10px] py-1">
                    {student.phone || "917903344626, 9122215508"}
                </div>
            </div>
        </>
    );
}