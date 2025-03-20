import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { HttpStatusCodes } from 'src/common/httpStatusCodes';
import { sendOtp } from 'src/common/otp.service';
import { registrationDto } from 'src/user/dto/registration.dto';
import { responseDto } from 'src/user/dto/response.dto';
import * as bcrypt from 'bcrypt';
import { verifyOtpDto } from 'src/user/dto/verifyOtp.dto';
import { blogDto } from 'src/user/dto/blog.dto';
import { displayBlogDto } from 'src/user/dto/displayBlog.dto';
import { userDto } from 'src/user/dto/user.dto';
import { loginDto } from 'src/user/dto/login.dto';
import { UserRepository } from 'src/user/repository/user.repository';
import { BlogRepository } from 'src/user/repository/blog.repository';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private blogRepository: BlogRepository,
  ) {}

  async userRegistration(
    registrationDto: registrationDto,
  ): Promise<responseDto> {
    const { password, ...userData } = registrationDto;

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new HttpException('Email Already Exists', HttpStatus.BAD_REQUEST);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      await this.userRepository.createUser({
        ...userData,
        password: hashedPassword,
      });
      const otpResponse = await sendOtp(userData.email);
      if (!otpResponse.success) {
        return {
          status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
          error: 'User registered, but failed to send OTP email',
        };
      } else {
        await this.userRepository.updateUser(
          userData.email,
          Number(otpResponse.otp),
        );
        return {
          status: HttpStatusCodes.CREATED,
          message: 'user registration successfull, otp send',
        };
      }
    }
  }

  async resendOtp(email: string): Promise<responseDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const otpResponse = await sendOtp(email);
    if (!otpResponse.success) {
      throw new HttpException(
        'Failed to resend OTP',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    await this.userRepository.updateUser(email, Number(otpResponse.otp));
    return {
      status: HttpStatusCodes.OK,
      message: 'OTP has been resent successfully',
    };
  }

  async verifyOtp(verifyOtpDto: verifyOtpDto): Promise<responseDto> {
    let newEmail: string | undefined;
    if (verifyOtpDto.newEmail !== null) {
      newEmail = verifyOtpDto.newEmail;
    }
    const { otp, email, isForgotPassword } = verifyOtpDto;

    if (!isForgotPassword && newEmail) {
      const users = await this.userRepository.findUsersByEmail(newEmail);
      if (users.length !== 0) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
    }

    const userData = await this.userRepository.findByEmail(email);
    if (!userData) {
      throw new HttpException(
        'Could not find the user',
        HttpStatus.BAD_REQUEST,
      );
    }
    const otpExpiryMinute = 59;
    const otpExpirySecond = otpExpiryMinute * 60;
    const timeDifference = Math.floor(
      (new Date().getTime() - new Date(userData.otpSendTime).getTime()) / 1000,
    );
    if (timeDifference > otpExpirySecond) {
      throw new HttpException('Otp Expired. ', HttpStatus.BAD_REQUEST);
    }
    if (otp != userData.otp) {
      throw new HttpException('Invalid Otp', HttpStatus.BAD_REQUEST);
    }
    if (newEmail) {
      await this.userRepository.updateUserEmail(
        userData._id as string,
        newEmail,
      );
    }
    return {
      status: HttpStatusCodes.OK,
      message: 'Verified Successfully',
    };
  }

  async login(loginDto: loginDto): Promise<responseDto> {
    const { email, password } = loginDto;
    const userData = await this.userRepository.findByEmail(email);
    if (!userData) {
      throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
    } else {
      const validatePassword = await bcrypt.compare(
        password,
        userData.password,
      );
      if (validatePassword) {
        const payload = {
          _id: userData._id,
          email: userData.email,
        };
        const accessToken = this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET || '9645743868',
          expiresIn: '15m',
        });
        const refreshToken = this.jwtService.sign(payload, {
          secret: process.env.JWT_REFRESH_SECRET || '9645743868_refresh',
          expiresIn: '7d',
        });
        return {
          status: HttpStatusCodes.OK,
          message: 'Login Successfully',
          accessToken: accessToken,
          refreshToken: refreshToken,
          accessedUser: userData._id,
        };
      } else {
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @Post('refresh-token')
  async refreshToken(refreshToken: string): Promise<responseDto> {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || '9645743868_refresh',
      });
      const newAccessToken = this.jwtService.sign(
        { _id: payload._id, email: payload.email },
        {
          secret: process.env.JWT_SECRET || '9645743868',
          expiresIn: '15m',
        },
      );
      return {
        status: HttpStatus.OK,
        accessToken: newAccessToken,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

  async userDetails(_id: string): Promise<userDto> {
    if (!_id) {
      throw new Error('User ID is required');
    }
    const userDetails = await this.userRepository.findById(_id);
    if (!userDetails) {
      throw new Error('User not found');
    }
    return {
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      email: userDetails.email,
      profilePicture: userDetails.profilePicture,
    };
  }

  async changeProfilePicture(userDto: userDto): Promise<responseDto> {
    if (userDto._id && userDto.profilePicture) {
      await this.userRepository.updateProfilePicture(
        userDto._id as string,
        userDto.profilePicture,
      );
      return {
        status: HttpStatusCodes.OK,
        message: 'Profile picture updated',
      };
    } else {
      return {
        status: HttpStatusCodes.BAD_REQUEST,
        message: 'Missing required fields',
      };
    }
  }

  async editUserName(userDto: userDto): Promise<responseDto> {
    if ((userDto._id && userDto.firstname, userDto.lastname)) {
      await this.userRepository.updateUserName(
        userDto._id as string,
        userDto.firstname as string,
        userDto.lastname,
      );

      return {
        status: HttpStatusCodes.OK,
        message: 'User profile updated',
      };
    } else {
      return {
        status: HttpStatusCodes.BAD_REQUEST,
        message: 'Missing required fields',
      };
    }
  }
  async editUserEmail(userDto: userDto): Promise<responseDto> {
    if (userDto._id && userDto.email) {
      const otpResponse = await sendOtp(userDto.email);
      if (!otpResponse.success) {
        return {
          status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
          error: 'User registered, but failed to send OTP email',
        };
      } else {
        await this.userRepository.updateOtpByUserId(
          userDto._id as string,
          Number(otpResponse.otp),
        );
        return {
          status: HttpStatusCodes.OK,
          message: 'Verification Code send to your Email id',
        };
      }
    } else {
      return {
        status: HttpStatusCodes.BAD_REQUEST,
        message: 'Missing required fields',
      };
    }
  }

  async verifyEmail(userDto: userDto): Promise<responseDto> {
    if (userDto.email) {
      const userData = await this.userRepository.findByEmail(userDto.email);
      if (userData) {
        const otpResponse = await sendOtp(userData.email);
        await this.userRepository.updateOtpByUserId(
          userData._id as string,
          Number(otpResponse.otp),
        );
        return {
          email: userData.email,
          status: HttpStatusCodes.OK,
          message: 'Email verified and code sent to your email',
        };
      } else {
        return {
          status: HttpStatusCodes.BAD_REQUEST,
          message: 'Invalid Email address',
        };
      }
    } else {
      return {
        status: HttpStatusCodes.BAD_REQUEST,
        message: 'Missing required fields',
      };
    }
  }

  async newPassword(userDto: userDto): Promise<responseDto> {
    if (userDto.email && userDto.password) {
      const userData = await this.userRepository.findByEmail(userDto.email);

      if (userData) {
        const hashedPassword = await bcrypt.hash(userDto.password, 10);

        await this.userRepository.updatePassword(userDto.email, hashedPassword);
        return {
          email: userData.email,
          status: HttpStatusCodes.OK,
          message: 'Password changed Successfully',
        };
      } else {
        return {
          status: HttpStatusCodes.BAD_REQUEST,
          message: 'User not found',
        };
      }
    } else {
      return {
        status: HttpStatusCodes.BAD_REQUEST,
        message: 'Missing required fields',
      };
    }
  }

  // blogs
  async createBlog(createBlogDto: blogDto): Promise<responseDto> {
    if (createBlogDto) {
      const userData = await this.userRepository.findById(createBlogDto.userId);
      if (userData) {
        if (createBlogDto.topic === 'Other' && createBlogDto.otherTopic) {
          createBlogDto.topic = createBlogDto.otherTopic;
        }
        await this.blogRepository.create({
          topic: createBlogDto.topic,
          title: createBlogDto.title,
          content: createBlogDto.content,
          image: createBlogDto.image,
          userId: createBlogDto.userId,
        });
        return {
          status: HttpStatusCodes.CREATED,
          message: 'Blog Created Successfully',
        };
      } else {
        return {
          status: HttpStatusCodes.NOT_FOUND,
          message: 'User not found',
        };
      }
    } else {
      return {
        status: HttpStatusCodes.BAD_REQUEST,
        message: 'Missing Required fields',
      };
    }
  }

  async editBlog(editBlogDto: blogDto): Promise<responseDto> {
    if (editBlogDto) {
      const userData = await this.userRepository.findById(editBlogDto.userId);
      if (userData) {
        if (editBlogDto.topic === 'other' && editBlogDto.otherTopic) {
          editBlogDto.topic = editBlogDto.otherTopic;
        }
        await this.blogRepository.update(editBlogDto._id as string, {
          topic: editBlogDto.topic,
          title: editBlogDto.title,
          content: editBlogDto.content,
          image: editBlogDto.image,
        });
        return {
          status: HttpStatusCodes.CREATED,
          message: 'Blog Edited Successfully',
        };
      } else {
        return {
          status: HttpStatusCodes.NOT_FOUND,
          message: 'User not found',
        };
      }
    } else {
      return {
        status: HttpStatusCodes.BAD_REQUEST,
        message: 'Missing Required fields',
      };
    }
  }

  async deleteBlog(_id: string): Promise<responseDto> {
    await this.blogRepository.delete(_id);
    return {
      status: HttpStatusCodes.OK,
      message: 'Deleted Successfully',
    };
  }

  async PersonalBlogs(userId: string): Promise<displayBlogDto[]> {
    const blogs = await this.blogRepository.personalBlogs(userId);
    return blogs.map((blog) => ({
      userId: {
        _id: blog.userId._id,
        firstname: blog.userId.firstname,
        lastname: blog.userId.lastname,
        email: blog.userId.email,
      },
      _id: blog._id,
      topic: blog.topic,
      title: blog.title,
      content: blog.content,
      image: blog.image,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));
  }

  async AllBlogs(): Promise<displayBlogDto[]> {
    const blogs = await this.blogRepository.allBlogs();
    return blogs.map((blog) => ({
      userId: {
        _id: blog.userId._id,
        firstname: blog.userId.firstname,
        lastname: blog.userId.lastname,
        email: blog.userId.email,
      },
      _id: blog._id,
      topic: blog.topic,
      title: blog.title,
      content: blog.content,
      image: blog.image,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));
  }

  async SingleBlog(blogId: string): Promise<displayBlogDto> {
    const blogs = await this.blogRepository.singleBlog(blogId);
    if (!blogs) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }
    if (!blogs.userId) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      userId: {
        _id: blogs.userId._id,
        firstname: blogs.userId.firstname,
        lastname: blogs.userId.lastname,
        email: blogs.userId.email,
      },
      _id: blogs._id as Types.ObjectId,
      topic: blogs.topic,
      title: blogs.title,
      content: blogs.content,
      image: blogs.image,
      createdAt: blogs.createdAt ?? new Date(),
      updatedAt: blogs.updatedAt ?? new Date(),
    };
  }
}
