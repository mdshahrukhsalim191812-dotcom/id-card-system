import {
    Document,
    Page,
    Image,
    Text,
    StyleSheet,
} from "@react-pdf/renderer";
import fs from "fs";
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

export default function KarishmaConventSchool({
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
                            src={fs.readFileSync(
                                `${process.cwd()}/public/templates/karishma-convent-school.jpeg`
                            )}
                            style={styles.background}
                        />

                        {student.image && (
                            <Image
                                src={student.image}
                                style={{
                                    position:
                                        "absolute",
                                    top: 123,
                                    left: 100.5,
                                    width: 99,
                                    height: 124.1,
                                }}
                            />
                        )}

                        {/* Student Name */}
                        <Text
                            style={{
                                position: "absolute",
                                top: 292,
                                left: 10,
                                width: 280,
                                textAlign: "center",
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#e11d48",
                            }}
                        >
                            {student.name}
                        </Text>

                        {/* Admission No */}
                        <Text
                            style={{
                                position: "absolute",
                                top: 330,
                                left: 20,
                                fontSize: 11,
                                color: "#dc2626",
                                fontWeight: "bold",
                            }}
                        >
                            Admn. No.
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 330,
                                left: 110,
                                fontSize: 11,
                                fontWeight: "bold",
                            }}
                        >
                            : {student.admissionNo}
                        </Text>

                        {/* Class */}
                        <Text
                            style={{
                                position: "absolute",
                                top: 330,
                                left: 210,
                                fontSize: 11,
                                color: "#dc2626",
                                fontWeight: "bold",
                            }}
                        >
                            Class
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 330,
                                left: 250,
                                fontSize: 11,
                                fontWeight: "bold",
                            }}
                        >
                            : {student.class}
                        </Text>

                        {/* Mother Name */}
                        <Text
                            style={{
                                position: "absolute",
                                top: 355,
                                left: 20,
                                fontSize: 11,
                                color: "#dc2626",
                                fontWeight: "bold",
                            }}
                        >
                            M. Name
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 355,
                                left: 110,
                                fontSize: 11,
                                fontWeight: "bold",
                            }}
                        >
                            : {student.mother || "N/A"}
                        </Text>

                        {/* Father Name */}
                        <Text
                            style={{
                                position: "absolute",
                                top: 380,
                                left: 20,
                                fontSize: 11,
                                color: "#dc2626",
                                fontWeight: "bold",
                            }}
                        >
                            F. Name
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 380,
                                left: 110,
                                fontSize: 11,
                                fontWeight: "bold",
                            }}
                        >
                            : {student.father}
                        </Text>

                        {/* DOB */}
                        <Text
                            style={{
                                position: "absolute",
                                top: 405,
                                left: 20,
                                fontSize: 11,
                                color: "#dc2626",
                                fontWeight: "bold",
                            }}
                        >
                            D.O.B.
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 405,
                                left: 110,
                                fontSize: 11,
                                fontWeight: "bold",
                            }}
                        >
                            : {formatDate(student.dob?.split("T")[0])}
                        </Text>

                        {/* Phone */}
                        <Text
                            style={{
                                position: "absolute",
                                top: 430,
                                left: 20,
                                fontSize: 11,
                                color: "#dc2626",
                                fontWeight: "bold",
                            }}
                        >
                            Ph. No.
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 430,
                                left: 110,
                                fontSize: 11,
                                fontWeight: "bold",
                            }}
                        >
                            : {student.phone}
                        </Text>

                        {/* Address */}
                        <Text
                            style={{
                                position: "absolute",
                                top: 455,
                                left: 20,
                                fontSize: 11,
                                color: "#dc2626",
                                fontWeight: "bold",
                            }}
                        >
                            Address
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 455,
                                left: 110,
                                width: 170,
                                fontSize: 10,
                                fontWeight: "bold",
                            }}
                        >
                            : {student.address}
                        </Text>
                    </Page>
                )
            )}
        </Document>
    );
}