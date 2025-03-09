interface OtpResult {
    success: boolean;
    message?: string;
    error?: string;
    otp?: string;
}
export declare function sendOtp(email: string): Promise<OtpResult>;
export {};
