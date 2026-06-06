import {
    Document,
    Page,
    Image,
    Text,
    StyleSheet,
} from "@react-pdf/renderer";
import { formatDate } from "@/lib/formatDate";

const styles = StyleSheet.create({
    page: {
        width: 300,
        height: 476,
        position: "relative",
    },

    background: {
        width: 300,
        height: 476,
    },
});

export default function HappyValleySchoolBhagalpur({
    data,
}: {
    data: any;
}) {
    return (
        <Document>
            {data.students.map(
                (student: any) => (
                    <Page
                        key={student._id}
                        size={[300, 476]}
                        style={styles.page}
                    >
                        <Image
                            src="http://localhost:3000/templates/happy-valley-school-bhagalpur.jpg"
                            style={
                                styles.background
                            }
                        />

                        {student.image && (
                            <Image
                                src={student.image}
                                style={{
                                    position:
                                        "absolute",
                                    top: 133,
                                    left: 171,
                                    width: 103.5,
                                    height: 130,
                                }}
                            />
                        )}

                        <Text
                            style={{
                                position:
                                    "absolute",
                                top: 274,
                                left: -10,
                                width: 260,
                                textAlign:
                                    "center",
                                fontSize: 22,
                                color:
                                    "#ffffff",
                                fontWeight: "bold",
                            }}
                        >
                            {student.name}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 295,
                                left: 25,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#1e40af",
                            }}
                        >
                            {student.class}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 295,
                                left: 190,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#1e40af",
                            }}
                        >
                            Sec : {student.sec}
                        </Text>

<Text
                            style={{
                                position: "absolute",
                                top: 222.5,
                                left: 78,
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "#000000",
                            }}
                        >
                            {student.admissionNo}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 315,
                                left: 25,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#1e40af",
                            }}
                        >
                            D.O.B : {formatDate(student.dob?.split("T")[0]) || "N/A"}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 315,
                                left: 190,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#1e40af",
                            }}
                        >
                            Roll No : {student.roll}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 335,
                                left: 25,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#1e40af",
                            }}
                        >
                            F. Name : {student.father}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 355,
                                left: 25,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#1e40af",
                            }}
                        >
                            Mobile : {student.phone}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 395,
                                left: 25,
                                width: 240,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#1e40af",
                            }}
                        >
                            Address : {student.address}
                        </Text>
                    </Page>
                )
            )}
        </Document>
    );
}