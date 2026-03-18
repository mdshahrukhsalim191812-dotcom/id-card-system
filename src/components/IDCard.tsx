export default function IDCard({ student }: { student: any }) {
    return (
        <div className="w-64 h-96 bg-white shadow p-4 border">
            <div className="text-center">
                <h2 className="font-bold text-lg">School Name</h2>
            </div>

            <div className="flex justify-center my-3">
                <img
                    src={student?.photo || "/avatar.png"}
                    className="w-20 h-20 rounded-full border"
                />
            </div>

            <div className="text-center space-y-1">
                <h3 className="font-semibold">{student?.name}</h3>
                <p>Class: {student?.class}</p>
                <p>Roll: {student?.roll}</p>
            </div>
        </div>
    );
}