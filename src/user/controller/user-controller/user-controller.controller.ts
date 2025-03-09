import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CustomHttpExceptionFilter } from 'src/common/customHttpExceptionFilter';
import { HttpStatusCodes } from 'src/common/httpStatusCodes';
import { blogDto } from 'src/user/dto/blog.dto';
import { displayBlogDto } from 'src/user/dto/displayBlog.dto';
import { loginDto } from 'src/user/dto/login.dto';
import { registrationDto } from 'src/user/dto/registration.dto';
import { responseDto } from 'src/user/dto/response.dto';
import { userDto } from 'src/user/dto/user.dto';
import { verifyOtpDto } from 'src/user/dto/verifyOtp.dto';
import { UserService } from 'src/user/service/user/user.service';

@Controller('user')
@UseFilters(new CustomHttpExceptionFilter())
export class UserControllerController {
  constructor(private readonly _userService: UserService) {}

  @Post('userRegister')
  async userRegistration(
    @Body() registrationDto: registrationDto,
  ): Promise<responseDto> {
    const response = await this._userService.userRegistration(registrationDto);

    if (response.status === HttpStatusCodes.BAD_REQUEST) {
      throw new HttpException(
        response.error ?? 'An error occurred',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return response;
    }
  }

  @Post('resendOtp')
  async resendOtp(@Body('email') email: string) {
    return await this._userService.resendOtp(email);
  }

  @Post('verifyOtp')
  async verifyOtp(@Body() verifyOtpDto: verifyOtpDto): Promise<responseDto> {
    return await this._userService.verifyOtp(verifyOtpDto);
  }
  @Post('login')
  async login(@Body() loginDto: loginDto): Promise<responseDto> {
    return await this._userService.login(loginDto);
  }
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return await this._userService.refreshToken(refreshToken);
  }
  @Post('createBlog')
  async createBlog(@Body() blogDto: blogDto): Promise<responseDto> {
    return await this._userService.createBlog(blogDto);
  }
  @Put('editBlog')
  async editBlog(@Body() blogDto: blogDto): Promise<responseDto> {
    return await this._userService.editBlog(blogDto);
  }
  @Delete('deleteBlog/:blogId')
  async deleteBlog(@Param('blogId') blogId: string): Promise<responseDto> {
    return await this._userService.deleteBlog(blogId);
  }
  @Get('PersonalBlogs/:userId')
  async PersonalBlogs(
    @Param('userId') userId: string,
  ): Promise<displayBlogDto[]> {
    return await this._userService.PersonalBlogs(userId);
  }
  @Get('AllBlogs')
  async AllBlogs(): Promise<displayBlogDto[]> {
    return await this._userService.AllBlogs();
  }
  @Get('SingleBlog/:blogId')
  async SingleBlog(@Param('blogId') blogId: string): Promise<displayBlogDto> {
    return await this._userService.SingleBlog(blogId);
  }
  @Get('userDetails/:_id')
  async userDetails(@Param('_id') _id: string): Promise<userDto> {
    return await this._userService.userDetails(_id);
  }
  @Post('changeProfilePicture')
  async changeProfilePicture(@Body() userDto: userDto): Promise<responseDto> {
    return await this._userService.changeProfilePicture(userDto);
  }
  @Patch('editUserName')
  async editUserName(@Body() userDto: userDto): Promise<responseDto> {
    return await this._userService.editUserName(userDto);
  }
  @Post('editUserEmail')
  async editUserEmail(@Body() userDto: userDto): Promise<responseDto> {
    return await this._userService.editUserEmail(userDto);
  }
  @Post('verifyEmail')
  async verifyEmail(@Body() userDto: userDto): Promise<responseDto> {
    return await this._userService.verifyEmail(userDto);
  }

  @Patch('newPassword')
  async newPassword(@Body() userDto: userDto): Promise<responseDto> {
    return await this._userService.newPassword(userDto);
  }
}
