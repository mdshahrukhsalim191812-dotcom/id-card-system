/*eslint-disable @next/next/no-img-element*/

type Props = {
    student: any;
    image: string | null;
    logo: string | null;
    signature: string | null;
    formatDate: (date: string) => string;
    school: any;
};

export default function NewEraEnglishSchool({
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
            className="relative w-[300px] h-[476px] bg-cover bg-center overflow-hidden"
            style={{
                backgroundImage: `url(${school?.templateImage || "/templates/new-era.jpeg"})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center"
            }}
        >

            {image && (
                <img
                    src={image}
                    alt="student"
                    className="absolute top-[111px] left-[96.5px] w-[107px] h-[132px] object-cover rounded-[10px] border"
                />
            )}

            {logo && (
                <img
                    src={logo}
                    alt="logo"
                    className="absolute top-[128px] left-[15px] w-[70px] h-[70px] object-contain"
                />
            )}

            <div className="absolute top-[240px] left-0 w-full flex justify-center">
                <span className="text-white font-bold text-[20px] tracking-wide">
                    {student.name || "----"}
                </span>
            </div>

            <div className="absolute top-[295px] left-[20px] text-[13px] font-bold text-blue-800 leading-tight space-y-[2px]">
                <p>Class : {student.class || "-"}</p>
                <p>D.O.B : {formatDate(student.dob) || "-"}</p>
                <p>F. Name : {student.father || "-"}</p>
                <p>Mobile : {student.phone || "-"}</p>
                <p>Admn. No : {student.admissionNo || "-"}</p>
                <p>Address : {student.address || "-"}</p>
            </div>

            <div className="absolute top-[291px] right-[20px] text-[13px] font-bold text-blue-800">
                <p className="relative top-[2px]">Sec : {student.sec || "-"}</p>
                <p>Roll No : {student.roll || "-"}</p>
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