import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    try {
        // 1. Postman-a (Transporter) setup panrom
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Neenga Gmail use panrathaa iruntha
            auth: {
                user: process.env.EMAIL_USER, // Unga Gmail ID
                pass: process.env.EMAIL_PASS, // Normal password illa, 'App Password'
            },
        });

        // 2. Letter (Mail options) ready panrom
        const mailOptions = {
            from: `"Conference Team" <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            html: options.message, // HTML use panna design nalla irukum
        };

        // 3. Mail-a anuppidrom
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Email anuppurathula error:', error);
    }
};

export default sendEmail;