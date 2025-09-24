import { loginDto } from 'src/user/dto/login.dto';
import { registrationDto } from 'src/user/dto/registration.dto';
import { responseDto } from 'src/user/dto/response.dto';
import { userDto } from 'src/user/dto/user.dto';
import { verifyOtpDto } from 'src/user/dto/verifyOtp.dto';
import { IUserService } from 'src/user/service/user/IUser.service';
export declare class UserControllerController {
    private userService;
    constructor(userService: IUserService);
    userRegistration(registrationDto: registrationDto): Promise<responseDto>;
    resendOtp(email: string): Promise<responseDto>;
    verifyOtp(verifyOtpDto: verifyOtpDto): Promise<responseDto>;
    login(loginDto: loginDto): Promise<responseDto>;
    refreshToken(refreshToken: string): Promise<responseDto>;
    userDetails(_id: string): Promise<userDto>;
    changeProfilePicture(userDto: userDto): Promise<responseDto>;
    editUserName(userDto: userDto): Promise<responseDto>;
    editUserEmail(userDto: userDto): Promise<responseDto>;
    verifyEmail(userDto: userDto): Promise<responseDto>;
    newPassword(userDto: userDto): Promise<responseDto>;
}
