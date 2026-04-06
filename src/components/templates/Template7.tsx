/*eslint-disable @next/next/no-img-element*/

type Props = {
    student: any;
    image: string | null;
    logo: string | null;
    signature: string | null;
    formatDate: (date: string) => string;
};

export default function Template7({
    student,
    image,
    logo,
    signature,
    formatDate,
}: Props) {
    return (
        <div
            id="card"
            className="relative w-[270px] h-[440px] bg-cover bg-center border"
            style={{
                backgroundImage: "url('/templates/NewEraEnglishSchool.jpeg')",
            }}
        >
            {/* 🟢 STUDENT PHOTO */}
            {image && (
                <img
                    src={image}
                    className="absolute top-[110px] left-[85px] w-[100px] h-[120px] object-cover rounded-md"
                />
            )}

            {/* 🟢 SCHOOL LOGO */}
            {logo && (
                <img
                    src={logo}
                    className="absolute top-[140px] left-[20px] w-[60px] h-[60px] object-contain"
                />
            )}

            {/* 🟢 NAME */}
            <div className="absolute top-[240px] left-1/2 -translate-x-1/2 w-[200px] text-center text-white font-bold text-sm bg-green-900 py-1 rounded">
                {student.name || "----"}
            </div>

            {/* 🟢 LEFT DETAILS */}
            <div className="absolute top-[290px] left-[20px] text-[12px] font-bold text-red-600 space-y-1">
                <p>Class : {student.class}</p>
                <p>D.O.B : {formatDate(student.dob)}</p>
                <p>F. Name : {student.father}</p>
                <p>Mobile : {student.phone}</p>
                <p>Address : {student.address}</p>
            </div>

            {/* 🟢 RIGHT DETAILS */}
            <div className="absolute top-[290px] right-[20px] text-[12px] font-bold text-red-600">
                <p>Roll No : {student.roll}</p>
            </div>

            {/* 🟢 SIGNATURE */}
            {signature && (
                <img
                    src={signature}
                    className="absolute bottom-[20px] right-[20px] w-[80px]"
                />
            )}
        </div>
    );
}