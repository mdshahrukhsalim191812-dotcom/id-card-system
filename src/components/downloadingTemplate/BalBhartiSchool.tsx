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

export default function BalBhartiSchool({
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
                            src="http://localhost:3000/templates/bal-bharti.png"
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
                                    top: 118.1,
                                    left: 145.2,
                                    width: 127,
                                    height: 161,
                                }}
                            />
                        )}

                        <Text
                            style={{
                                position: "absolute",
                                top: 237.5,
                                left: 75,
                                fontSize: 13,
                                fontWeight: "bold",
                                color: "#000000",
                            }}
                        >
                            {student.class}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 253.5,
                                left: 75,
                                fontSize: 13,
                                fontWeight: "bold",
                                color: "#000000",
                            }}
                        >
                            {student.sec}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 269,
                                left: 75,
                                fontSize: 13,
                                fontWeight: "bold",
                                color: "#000000",
                            }}
                        >
                            {student.roll}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 285.5,
                                left: 75,
                                fontSize: 13,
                                fontWeight: "bold",
                                color: "#000000",
                            }}
                        >
                            {formatDate(student.dob?.split("T")[0]) || "N/A"}
                        </Text>

                        <Text
                            style={{
                                position:
                                    "absolute",
                                top: 311,
                                left: 20,
                                width: 260,
                                textAlign:
                                    "center",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 22,
                                color:
                                    "#cc3737",
                                fontWeight: "bold",
                                letterSpacing: -1,
                            }}
                        >
                            {student.name}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 342.5,
                                left: 85,
                                fontSize: 13,
                                fontWeight: "bold",
                                color: "#000000",
                            }}
                        >
                            {student.admissionNo}
                        </Text>


                        <Text
                            style={{
                                position: "absolute",
                                top: 358.5,
                                left: 85,
                                fontSize: 13,
                                fontWeight: "bold",
                                color: "#000000",
                            }}
                        >
                            {student.father}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 374.5,
                                left: 85,
                                fontSize: 13,
                                fontWeight: "bold",
                                color: "#000000",
                            }}
                        >
                            {student.mother}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 390.7,
                                left: 85,
                                fontSize: 13,
                                fontWeight: "bold",
                                color: "#000000",
                            }}
                        >
                            {student.phone}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 407.2,
                                left: 85,
                                width: 210,
                                fontSize: 13,
                                fontWeight: "bold",
                                color: "#000000",
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