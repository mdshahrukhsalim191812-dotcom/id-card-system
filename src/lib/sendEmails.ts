import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS,

    },

});

type SendEmailProps = {

    to: string;

    subject: string;

    html: string;

};

export default async function sendEmail({
    to,
    subject,
    html,
}: SendEmailProps) {

    try {

        await transporter.sendMail({

            from: `"Work GeniX" <${process.env.EMAIL_USER}>`,

            to,

            subject,

            html,

        });

        return true;

    } catch (error) {

        console.log("EMAIL ERROR:", error);

        return false;
    }
}