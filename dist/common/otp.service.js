"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = sendOtp;
const nodemailer = require("nodemailer");
const crypto_1 = require("crypto");
async function sendOtp(email) {
    console.log('send otp service');
    try {
        const otp = (0, crypto_1.randomInt)(100000, 999999).toString();
        console.log(otp);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.TRANSPORTER_EMAIL,
                pass: process.env.TRANSPORTER_PASSWORD,
            },
        });
        const mailOptions = {
            from: '"Easy Post" devsaytho@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
        };
        console.log(mailOptions);
        await transporter.sendMail(mailOptions);
        return {
            success: true,
            message: `OTP sent successfully to ${email}`,
            otp: otp,
        };
    }
    catch (error) {
        console.error('Error sending OTP email:', error);
        return { success: false, error: 'Failed to send OTP email.' };
    }
}
//# sourceMappingURL=otp.service.js.map