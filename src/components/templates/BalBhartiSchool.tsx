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
                    className="absolute top-[102px] left-[85px] w-[98px] h-[120px] object-cover rounded-md border"
                />
            )}

            {logo && (
                <img
                    src={logo}
                    alt="logo"
                    className="absolute top-[140px] left-[20px] w-[60px] h-[60px] object-contain"
                />
            )}

            <div className="absolute top-[229px] left-1/2 -translate-x-1/2 w-[200px] text-center text-white font-bold text-sm py-1 rounded">
                {student.name || "----"}
            </div>

            <div className="absolute top-[270px] left-[20px] text-[13px] font-bold text-blue-800 leading-tight space-y-[2px]">
                <p>Class : {student.class || "-"}</p>
                <p>D.O.B : {formatDate(student.dob) || "-"}</p>
                <p>F. Name : {student.father || "-"}</p>
                <p>Mobile : {student.phone || "-"}</p>
                <p>Address : {student.address || "-"}</p>
            </div>

            <div className="absolute top-[290px] right-[20px] text-[13px] font-bold text-blue-800">
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