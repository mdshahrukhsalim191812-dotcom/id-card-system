/*eslint-disable @next/next/no-img-element*/

type Props = {
    student: any;
    image: string | null;
    logo: string | null;
    signature: string | null;
    formatDate: (date: string) => string;
    school: any;
};

export default function HappyValleySchoolBhagalpur({
    student,
    image,
    logo,
    signature,
    formatDate,
    school
}: Props) {

    return (
        <div
            id="card"
            className="relative w-[300px] h-[479px] bg-cover bg-center overflow-hidden"
            style={{
                backgroundImage: `url(${school?.templateImage || "/templates/happy-valley-school-bhagalpur.jpg"})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center"
            }}
        >

            {image && (
                <img
                    src={image}
                    alt="student"
                    className="absolute top-[133px] left-[170px] w-[105px] h-[130px] object-cover border"
                />
            )}

            {logo && (
                <img
                    src={logo}
                    alt="logo"
                    className="absolute top-[128px] left-[15px] w-[70px] h-[70px] object-contain"
                />
            )}



            <div className="absolute left-[20px] text-[14px] font-bold text-black leading-tight space-y-[2px]">
                <p className="relative left-[66px] top-[220px]">{student.admissionNo || "1234"}</p>
                <p className="relative left-[66px] top-[220px] tracking-tighter">{formatDate(student.dob) || "17 jan 2005"}</p>
                <p className="relative left-[66px] top-[219px]">{student.roll || "12"}</p>
                <p className="relative left-[2.5px] top-[256.5px] tracking-tighter">{student.father || "Md Salim Uddin Ansari"}</p>
                <p className="relative left-[2.5px] top-[267.5px] tracking-tighter">{student.mother || "Md Salim Uddin Ansari"}</p>
                <p className="relative left-[2.5px] top-[278px] tracking-tighter">{student.phone || "91 8229090931"}</p>
                <p className="relative left-[2.5px] top-[288px] w-[200px] leading-tight tracking-tighter">{student.address || "Kasba, Champanagar, Bhagalpur"}</p>
            </div>

            <div className="absolute top-[269px] left-[22px] w-full">
                <span className="text-black font-bold text-[22px] tracking-tighter">
                    {student.name || "----"}
                </span>
            </div>

            <div className="absolute text-[23px] font-bold text-blue-800">
                <p className="relative left-[198px] top-[350px]">{student.class || "Nur A"}</p>
            </div>

            {signature && (
                <img
                    src={signature}
                    alt="signature"
                    className="absolute bottom-[20px] right-[20px] w-[80px]"
                />
            )}

        </div>
    );
}