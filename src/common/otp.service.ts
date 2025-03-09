import * as nodemailer from 'nodemailer';

import { randomInt } from 'crypto';

interface OtpResult {
  success: boolean;
  message?: string;
  error?: string;
  otp?: string;
}

export async function sendOtp(email: string): Promise<OtpResult> {
  try {
    const otp = randomInt(100000, 999999).toString();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.TRANSPORTER_EMAIL,
        pass: process.env.TRANSPORTER_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Easy Post" ${process.env.TRANSPORTER_EMAIL}`,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: `OTP sent successfully to ${email}`,
      otp: otp,
    };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return { success: false, error: 'Failed to send OTP email.' };
  }
}
