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
            className="relative w-[300px] h-[476px] bg-cover bg-center border overflow-hidden"
            style={{
                backgroundImage: `url(${"/templates/bal-bharti.jpeg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >

            {image && (
                <img
                    src={image}
                    alt="student"
                    className="absolute top-[118px] left-[144.5px] w-[126px] h-[160px] object-cover"
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
                <p className="relative top-[-35px] left-[3.5px]">Class <span className="text-black">: {student.class || "-"}</span> </p>
                <p className="relative top-[-37px] left-[3.5px]">Sec <span className="text-black">: {student.sec || "-"}</span></p>
                <p className="relative top-[-39.5px] left-[3.5px]">Roll No  <span className="text-black">: {student.roll || "-"}</span></p>
                <p className="relative top-[-42px] left-[3.5px]">D.O.B  <span className="text-black">: {formatDate(student.dob) || "-"}</span></p>
            </div>

            <div className="absolute top-[298px] left-1/2 -translate-x-1/2 w-[220px] text-center text-black font-bold text-[20px] py-1 rounded">
                {student.name || "----"}
            </div>

            <div className="absolute top-[290px] left-[20px] text-[13px] font-bold text-indigo-900" style={{ fontFamily: "Arial Narrow, Arial, sans serif" }}>
                <p className="relative bottom-[-47.5px] left-[3px]">Admn. No <span className="text-black">: {student.admissionNo || "-"}</span></p>
                <p className="relative bottom-[-44px] left-[3px]">F. Name  <span className="text-black">: {student.father || "-"}</span></p>
                <p className="relative bottom-[-40.5px] left-[3px]">M. Name  <span className="text-black">: {student.mother || "-"}</span></p>
                <p className="relative bottom-[-37px] left-[3px]">Ph. No.  <span className="text-black">: {student.phone || "-"}</span></p>
                <p className="relative bottom-[-35px] w-[195px] left-[3px] leading-tight">Address  <span className="text-black">: {student.address || "-"}</span></p>
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