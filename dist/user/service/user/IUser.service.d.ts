import { loginDto } from 'src/user/dto/login.dto';
import { registrationDto } from 'src/user/dto/registration.dto';
import { responseDto } from 'src/user/dto/response.dto';
import { userDto } from 'src/user/dto/user.dto';
import { verifyOtpDto } from 'src/user/dto/verifyOtp.dto';
export declare abstract class IUserService {
    abstract userRegistration(registrationDto: registrationDto): Promise<responseDto>;
    abstract resendOtp(email: string): Promise<responseDto>;
    abstract verifyOtp(verifyOtpDto: verifyOtpDto): Promise<responseDto>;
    abstract login(loginDto: loginDto): Promise<responseDto>;
    abstract refreshToken(refreshToken: string): Promise<responseDto>;
    abstract userDetails(_id: string): Promise<userDto>;
    abstract changeProfilePicture(userDto: userDto): Promise<responseDto>;
    abstract editUserName(userDto: userDto): Promise<responseDto>;
    abstract editUserEmail(userDto: userDto): Promise<responseDto>;
    abstract verifyEmail(userDto: userDto): Promise<responseDto>;
    abstract newPassword(userDto: userDto): Promise<responseDto>;
}
