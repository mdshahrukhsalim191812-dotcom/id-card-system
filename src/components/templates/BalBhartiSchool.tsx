/*eslint-disable @next/next/no-img-element*/

type Props = {
    student: any;
    image: string | null;
    logo: string | null;
    signature: string | null;
    formatDate: (date: string) => string;
    school: any;
};

export default function Template7({
    student,
    image,
    logo,
    signature,
    formatDate,
    school
}: Props) {

    console.log("School:", school);
    console.log("Template Image:", school?.templateImage);

    return (
        <div
            id="card"
            className="relative w-[270px] h-[440px] bg-cover bg-center border overflow-hidden"
            style={{
                backgroundImage: `url(${school?.templateImage || "/templates/bal-bharti.jpeg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >

            {image && (
                <img
                    src={image}
                    alt="student"
                    className="absolute top-[109.9px] left-[130px] w-[115px] h-[146.5px] object-cover"
                />
            )}

            {logo && (
                <img
                    src={logo}
                    alt="logo"
                    className="absolute top-[94.5px] left-[26px] w-[74px] h-[74px] object-contain"
                />
            )}

            <div className="absolute top-[270px] left-[20px] text-[13px] font-bold text-indigo-900 leading-tight space-y-[2px]" style={{ fontFamily: "Arial Narrow, Arial, sans-serif" }}>
                <p className="relative top-[-54px] right-[2px]">Class : <span className="text-black">{student.class || "-"}</span> </p>
                <p className="relative top-[-58px] right-[2px]">Sec : {student.sec || "-"}</p>
                <p className="relative top-[-61px] right-[2px]">Roll No : {student.roll || "-"}</p>
                <p className="relative top-[-65px] right-[2px]">D.O.B : {formatDate(student.dob) || "-"}</p>
            </div>

            <div className="absolute top-[276px] left-1/2 -translate-x-1/2 w-[220px] text-center text-black font-bold text-[18px] py-1 rounded">
                {student.name || "----"}
            </div>

            <div className="absolute top-[290px] left-[20px] text-[13px] font-bold text-indigo-900" style={{fontFamily:"Arial Narrow, Arial, sans serif"}}>
                <p className="relative bottom-[-20.5px] right-[2.9px]">Admn. No : {student.admissionNo || "-"}</p>
                <p className="relative bottom-[-16.5px] right-[2.9px]">F. Name : {student.father || "-"}</p>
                <p className="relative bottom-[-11.5px] right-[2.9px]">M. Name : {student.mother || "-"}</p>
                <p className="relative bottom-[-7px] right-[2.9px]">Ph. No. : {student.phone || "-"}</p>
                <p className="relative bottom-[-2px] w-[195px] right-[2.9px] leading-tight">Address : {student.address || "-"}</p>
            </div>

            {signature && (
                <img
                    src={signature}
                    alt="signature"
                    className="absolute bottom-[30px] right-[20px] w-[60px]"
                />
            )}

        </div>
    );
}