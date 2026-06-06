import {
    Document,
    Page,
    Image,
    Text,
    StyleSheet,
} from "@react-pdf/renderer";

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

export default function NewEraEnglishSchool({
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
                            src="http://localhost:3000/templates/new-era.jpeg"
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
                                    top: 113,
                                    left: 98,
                                    width: 104,
                                    height: 128,
                                    borderRadius: 10,
                                }}
                            />
                        )}

                        <Text
                            style={{
                                position:
                                    "absolute",
                                top: 252.5,
                                left: 20,
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
                            Class : {student.class}
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
                                top: 315,
                                left: 25,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#1e40af",
                            }}
                        >
                            D.O.B : {student.dob?.split("T")[0] || "N/A"}
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
                                top: 375,
                                left: 25,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#1e40af",
                            }}
                        >
                            Admn. No : {student.admissionNo}
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