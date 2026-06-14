import {
    Document,
    Page,
    Image,
    Text,
    StyleSheet,
} from "@react-pdf/renderer";
import { formatDate } from "@/lib/formatDate";
import fs from "fs";

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
                                    width: 98.8,
                                    height: 124.2,
                                }}
                            />
                        )}

                        <Text
                            style={{
                                position:
                                    "absolute",
                                top: 258,
                                left: 20,
                                width: 260,
                                textAlign:
                                    "center",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 17,
                                color:
                                    "#1565c0",
                                fontWeight: "extrabold",
                                letterSpacing: -0.2,
                                transform: "scaleY(1.67)",
                            }}
                        >
                            {student.name}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 286,
                                left: 25,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#ab2020",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            Admn. No.
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 286,
                                left: 85,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#ab2020",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            :
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 286,
                                left: 105,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#000000",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            {student.admissionNo}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 307,
                                left: 25,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#ab2020",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            M. Name
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 307,
                                left: 85,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#ab2020",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            :
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 307,
                                left: 105,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#000000",
                                letterSpacing: -0.2,
                                transform: "scaleY(1.67)",
                            }}
                        >
                            {student.mother}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 327,
                                left: 25,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#ab2020",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            F. Name
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 327,
                                left: 85,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#ab2020",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            :
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 327,
                                left: 105,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#000000",
                                letterSpacing: -0.2,
                                transform: "scaleY(1.67)",
                            }}
                        >
                            {student.father}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 347,
                                left: 25,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#ab2020",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            D.O.B.
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 347,
                                left: 85,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#ab2020",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            :
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 347,
                                left: 105,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#000000",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            {formatDate(student.dob?.split("T")[0]) || "N/A"}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 368,
                                left: 25,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#ab2020",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            Ph. No.
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 368,
                                left: 85,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#ab2020",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            :
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 368,
                                left: 105,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#000000",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            {student.phone}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 389,
                                left: 25,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#ab2020",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            Address
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 389,
                                left: 85,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#ab2020",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            :
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 389,
                                left: 105,
                                width: 180,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#000000",
                                letterSpacing: -0.5,
                            }}
                        >
                            {student.address}
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 286,
                                left: 190,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#ab2020",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            Class
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 286,
                                left: 230,
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#ab2020",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            :
                        </Text>

                        <Text
                            style={{
                                position: "absolute",
                                top: 286,
                                left: 250,
                                fontSize: 10,
                                fontWeight: "900",
                                color: "#000000",
                                transform: "scaleY(1.67)",
                            }}
                        >
                            {student.class}
                        </Text>

                    </Page>
                )
            )}
        </Document>
    );
}