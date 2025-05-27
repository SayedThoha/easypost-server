import { JwtService } from '@nestjs/jwt';
import { registrationDto } from 'src/user/dto/registration.dto';
import { responseDto } from 'src/user/dto/response.dto';
import { verifyOtpDto } from 'src/user/dto/verifyOtp.dto';
import { userDto } from 'src/user/dto/user.dto';
import { loginDto } from 'src/user/dto/login.dto';
import { UserRepository } from 'src/user/repository/user.repository';
import { BlogRepository } from 'src/user/repository/blog.repository';
export declare class UserService {
    private jwtService;
    private userRepository;
    private blogRepository;
    constructor(jwtService: JwtService, userRepository: UserRepository, blogRepository: BlogRepository);
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
