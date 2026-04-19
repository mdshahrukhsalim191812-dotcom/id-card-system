import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generateBulkPDF = async ({
    students,
    cardRef,
    setStudent,
    setImage,
    setLogo,
    setSignature,
    school,
}: any) => {

    const pdf = new jsPDF("p", "mm", "a4");

    const cardWidth = 52;
    const cardHeight = 83;

    let count = 0;

    for (let i = 0; i < students.length; i++) {
        const student = students[i];

        setStudent(student);
        setImage(student.image || null);
        setLogo(student.logo || null);
        setSignature(student.signature || null);

        await new Promise(res => setTimeout(res, 400));

        const canvas = await html2canvas(cardRef.current, {
            scale: 3,
            width: 300,
            height: 476,
        });

        const imgData = canvas.toDataURL("image/png");

        const x = (count % 3) * 58 + 10;
        const y = Math.floor(count / 3) * 90 + 10;

        pdf.addImage(imgData, "PNG", x, y, cardWidth, cardHeight);

        count++;

        if (count % 9 === 0 && i !== students.length - 1) {
            pdf.addPage();
        }
    }

    pdf.save(`${school?.name || "ID"} Cards.pdf`);
};