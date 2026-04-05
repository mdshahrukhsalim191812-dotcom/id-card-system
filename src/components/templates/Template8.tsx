/*eslint-disable @next/next/no-img-element*/
import Image from "next/image";

type Student = {
    name: string;
    class: string;
    section: string;
    roll: string;
    dob: string;
    admn: string;
    father: string;
    mother: string;
    phone: string;
    address: string;
};

type Props = {
    student: Student;
    image: string | null;
    logo: string | null;
    formatDate: (date: string) => string
};

export default function IDCard({ student, image, logo, formatDate }: Props) {
    const isBlobImage = image?.startsWith("blob:");

    return (
        <div
            id="card"
            className="relative w-[270px] h-[440px] bg-cover bg-center border"
            style={{
                backgroundImage: "url('/templates/bg-1.jpeg')",
            }}
        >
            {/* 🔵 LOGO */}
            <div className="absolute top-[92px] left-[22.5px] w-[79px] h-[79px] overflow-hidden">
                {logo &&
                    (isBlobImage ? (
                        <img
                            src={logo}
                            alt="logo"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Image
                            src={logo}
                            alt="logo"
                            width={128}
                            height={158}
                            className="object-cover"
                        />
                    ))}
            </div>

            {/* 🔵 STUDENT PHOTO */}
            <div className="absolute top-[108px] right-[21px] w-[119px] h-[152px] overflow-hidden">
                {image &&
                    (isBlobImage ? (
                        <img
                            src={image}
                            alt="student"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Image
                            src={image}
                            alt="student"
                            width={128}
                            height={158}
                            className="object-cover"
                        />
                    ))}
            </div>

            {/* 🔵 CLASS DETAILS */}
            <div
                style={{
                    fontFamily: "Arial Narrow, Arial, sans-serif"
                }} className="absolute top-[216px] left-[18px] text-[12px] font-semibold text-blue-900 space-y-[-3.5px]">
                <p>Class : <span className="text-black">{student.class}</span></p>
                <p>Sec. : <span className="text-black">{student.section}</span></p>
                <p>Roll No. : <span className="text-black">{student.roll}</span></p>
                <p className="relative left-[-.5px]">D.O.B : <span className="text-black">{formatDate(student.dob)}</span></p>
            </div>

            {/* 🔴 NAME CENTER */}
            <p className="absolute top-[282px] left-[50%] w-[240px] -translate-x-1/2 text-red-600 font-bold text-[18px] justify-center text-center">
                {student.name}
            </p>

            {/* 🔵 LOWER DETAILS */}
            <div style={{
                fontFamily: "Arial Narrow, Arial, sans-serif"
            }}
                className="absolute top-[313px] left-[18px] text-[12px] font-semibold text-blue-900 space-y-[-3.5px] space-x-[-2px]">
                <p className="relative left-[-2px]">Admn. No : <span className="text-black">{student.admn}</span></p>
                <p>F. Name : <span className="text-black">{student.father}</span></p>
                <p>M. Name : <span className="text-black">{student.mother}</span></p>
                <p>Ph. No : <span className="text-black">{student.phone}</span></p>
                <p className="space-y-[-3.5px]">Address : <span className="text-black ">{student.address}</span></p>
            </div>
        </div>
    );
}