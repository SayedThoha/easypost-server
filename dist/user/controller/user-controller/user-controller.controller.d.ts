import { blogDto } from 'src/user/dto/blog.dto';
import { displayBlogDto } from 'src/user/dto/displayBlog.dto';
import { loginDto } from 'src/user/dto/login.dto';
import { registrationDto } from 'src/user/dto/registration.dto';
import { responseDto } from 'src/user/dto/response.dto';
import { userDto } from 'src/user/dto/user.dto';
import { verifyOtpDto } from 'src/user/dto/verifyOtp.dto';
import { UserService } from 'src/user/service/user/user.service';
export declare class UserControllerController {
    private readonly _userService;
    constructor(_userService: UserService);
    userRegistration(registrationDto: registrationDto): Promise<responseDto>;
    resendOtp(email: string): Promise<responseDto>;
    verifyOtp(verifyOtpDto: verifyOtpDto): Promise<responseDto>;
    login(loginDto: loginDto): Promise<responseDto>;
    refreshToken(refreshToken: string): Promise<responseDto>;
    createBlog(blogDto: blogDto): Promise<responseDto>;
    editBlog(blogDto: blogDto): Promise<responseDto>;
    deleteBlog(blogId: string): Promise<responseDto>;
    PersonalBlogs(userId: string): Promise<displayBlogDto[]>;
    AllBlogs(): Promise<displayBlogDto[]>;
    SingleBlog(blogId: string): Promise<displayBlogDto>;
    userDetails(_id: string): Promise<userDto>;
    changeProfilePicture(userDto: userDto): Promise<responseDto>;
    editUserName(userDto: userDto): Promise<responseDto>;
    editUserEmail(userDto: userDto): Promise<responseDto>;
    verifyEmail(userDto: userDto): Promise<responseDto>;
    newPassword(userDto: userDto): Promise<responseDto>;
}
