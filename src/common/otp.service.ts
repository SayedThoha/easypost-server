// src/common/otp.service.ts
import * as nodemailer from 'nodemailer';
// console.log('Nodemailer imported:', nodemailer)
import { randomInt } from 'crypto';

// Interface for the OTP sending result
interface OtpResult {
  success: boolean;
  message?: string;
  error?: string;
  otp?: string;
}

export async function sendOtp(email: string): Promise<OtpResult> {
  console.log('send otp service');

  try {
    // Generate a random 6-digit OTP
    const otp = randomInt(100000, 999999).toString();
    console.log(otp);

    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
      auth: {
        user: process.env.TRANSPORTER_EMAIL, // Replace with your email
        pass: process.env.TRANSPORTER_PASSWORD, // Replace with your email password or app password
      },
    });

    // Email content
    const mailOptions = {
      from: '"Easy Post" devsaytho@gmail.com', // sender address
      to: email, // recipient's email
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`, // plain text body
    };
    console.log(mailOptions);

    // Send email
    await transporter.sendMail(mailOptions);

    // If email sent successfully, return success and the OTP (save OTP in DB or memory)
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
