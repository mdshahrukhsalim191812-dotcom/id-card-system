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
                                left: 20,
                                width: 260,
                                fontSize: 22,
                                color:
                                    "#ffffff",
                                fontWeight: "bold",
                                letterSpacing: -1,
                            }}
                        >
                            {student.name}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 355,
                                left: 190,
                                fontSize: 22,
                                fontWeight: "bold",
                                color: "#f1f527",
                            }}
                        >
                            {student.class}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 355,
                                left: 250,
                                fontSize: 22,
                                fontWeight: "bold",
                                color: "#f1f527",
                            }}
                        >
                            {student.sec}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 222,
                                left: 86,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#000000",
                                letterSpacing: -1,
                            }}
                        >
                            {student.admissionNo}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 241,
                                left: 86,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#000000",
                                letterSpacing: -1,
                            }}
                        >
                            {formatDate(student.dob?.split("T")[0]) || "N/A"}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 259,
                                left: 86,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#000000",
                                letterSpacing: -1,
                            }}
                        >
                            {student.roll}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 317.5,
                                left: 23,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#000000",
                                letterSpacing: -1,
                            }}
                        >
                            {student.father}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 347.5,
                                left: 23,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#000000",
                                letterSpacing: -1,
                            }}
                        >
                            {student.mother}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 378,
                                left: 23,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#000000",
                                letterSpacing: -1,
                            }}
                        >
                            {student.phone}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 407,
                                left: 23,
                                width: 240,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#000000",
                                letterSpacing: -1,
                            }}
                        >
                            {student.address}
                        </Text>
                    </Page>
                )
            )}
        </Document>
    );
}