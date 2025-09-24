import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CustomHttpExceptionFilter } from 'src/common/customHttpExceptionFilter';
import { HttpStatusCodes } from 'src/common/httpStatusCodes';
import { loginDto } from 'src/user/dto/login.dto';
import { registrationDto } from 'src/user/dto/registration.dto';
import { responseDto } from 'src/user/dto/response.dto';
import { userDto } from 'src/user/dto/user.dto';
import { verifyOtpDto } from 'src/user/dto/verifyOtp.dto';
import { IUserService } from 'src/user/service/user/IUser.service';

@Controller('user')
@UseFilters(new CustomHttpExceptionFilter())
export class UserControllerController {
  constructor(private userService: IUserService) {}

  @Post('userRegister')
  async userRegistration(
    @Body() registrationDto: registrationDto,
  ): Promise<responseDto> {
    const response = await this.userService.userRegistration(registrationDto);
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
    return await this.userService.resendOtp(email);
  }

  @Post('verifyOtp')
  async verifyOtp(@Body() verifyOtpDto: verifyOtpDto): Promise<responseDto> {
    return await this.userService.verifyOtp(verifyOtpDto);
  }
  @Post('login')
  async login(@Body() loginDto: loginDto): Promise<responseDto> {
    return await this.userService.login(loginDto);
  }
  @Post('refreshToken')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return await this.userService.refreshToken(refreshToken);
  }

  @Get('userDetails/:_id')
  async userDetails(@Param('_id') _id: string): Promise<userDto> {
    return await this.userService.userDetails(_id);
  }
  @Post('changeProfilePicture')
  async changeProfilePicture(@Body() userDto: userDto): Promise<responseDto> {
    return await this.userService.changeProfilePicture(userDto);
  }
  @Patch('editUserName')
  async editUserName(@Body() userDto: userDto): Promise<responseDto> {
    return await this.userService.editUserName(userDto);
  }
  @Post('editUserEmail')
  async editUserEmail(@Body() userDto: userDto): Promise<responseDto> {
    return await this.userService.editUserEmail(userDto);
  }
  @Post('verifyEmail')
  async verifyEmail(@Body() userDto: userDto): Promise<responseDto> {
    return await this.userService.verifyEmail(userDto);
  }

  @Patch('newPassword')
  async newPassword(@Body() userDto: userDto): Promise<responseDto> {
    return await this.userService.newPassword(userDto);
  }
}
