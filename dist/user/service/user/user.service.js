"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const httpStatusCodes_1 = require("../../../common/httpStatusCodes");
const otp_service_1 = require("../../../common/otp.service");
const bcrypt = require("bcrypt");
const user_repository_1 = require("../../repository/user.repository");
const blog_repository_1 = require("../../repository/blog.repository");
let UserService = class UserService {
    jwtService;
    userRepository;
    blogRepository;
    constructor(jwtService, userRepository, blogRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.blogRepository = blogRepository;
    }
    async userRegistration(registrationDto) {
        const { password, ...userData } = registrationDto;
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new common_1.HttpException('Email Already Exists', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await this.userRepository.createUser({
                ...userData,
                password: hashedPassword,
            });
            const otpResponse = await (0, otp_service_1.sendOtp)(userData.email);
            if (!otpResponse.success) {
                return {
                    status: httpStatusCodes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
                    error: 'User registered, but failed to send OTP email',
                };
            }
            else {
                await this.userRepository.updateUser(userData.email, Number(otpResponse.otp));
                return {
                    status: httpStatusCodes_1.HttpStatusCodes.CREATED,
                    message: 'user registration successfull, otp send',
                };
            }
        }
    }
    async resendOtp(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const otpResponse = await (0, otp_service_1.sendOtp)(email);
        if (!otpResponse.success) {
            throw new common_1.HttpException('Failed to resend OTP', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        await this.userRepository.updateUser(email, Number(otpResponse.otp));
        return {
            status: httpStatusCodes_1.HttpStatusCodes.OK,
            message: 'OTP has been resent successfully',
        };
    }
    async verifyOtp(verifyOtpDto) {
        let newEmail;
        if (verifyOtpDto.newEmail !== null) {
            newEmail = verifyOtpDto.newEmail;
        }
        const { otp, email, isForgotPassword } = verifyOtpDto;
        if (!isForgotPassword && newEmail) {
            const users = await this.userRepository.findUsersByEmail(newEmail);
            if (users.length !== 0) {
                throw new common_1.HttpException('Email already exists', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        const userData = await this.userRepository.findByEmail(email);
        if (!userData) {
            throw new common_1.HttpException('Could not find the user', common_1.HttpStatus.BAD_REQUEST);
        }
        const otpExpiryMinute = 59;
        const otpExpirySecond = otpExpiryMinute * 60;
        const timeDifference = Math.floor((new Date().getTime() - new Date(userData.otpSendTime).getTime()) / 1000);
        if (timeDifference > otpExpirySecond) {
            throw new common_1.HttpException('Otp Expired. ', common_1.HttpStatus.BAD_REQUEST);
        }
        if (otp != userData.otp) {
            throw new common_1.HttpException('Invalid Otp', common_1.HttpStatus.BAD_REQUEST);
        }
        if (newEmail) {
            await this.userRepository.updateUserEmail(userData._id, newEmail);
        }
        return {
            status: httpStatusCodes_1.HttpStatusCodes.OK,
            message: 'Verified Successfully',
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const userData = await this.userRepository.findByEmail(email);
        if (!userData) {
            throw new common_1.HttpException('Invalid user', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            const validatePassword = await bcrypt.compare(password, userData.password);
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
                    status: httpStatusCodes_1.HttpStatusCodes.OK,
                    message: 'Login Successfully',
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    accessedUser: userData._id,
                };
            }
            else {
                throw new common_1.HttpException('Invalid password', common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async refreshToken(refreshToken) {
        try {
            const payload = await this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET || '9645743868_refresh',
            });
            const newAccessToken = this.jwtService.sign({ _id: payload._id, email: payload.email }, {
                secret: process.env.JWT_SECRET || '9645743868',
                expiresIn: '15m',
            });
            return {
                status: common_1.HttpStatus.OK,
                accessToken: newAccessToken,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Invalid refresh token', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async userDetails(_id) {
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
    async changeProfilePicture(userDto) {
        if (userDto._id && userDto.profilePicture) {
            await this.userRepository.updateProfilePicture(userDto._id, userDto.profilePicture);
            return {
                status: httpStatusCodes_1.HttpStatusCodes.OK,
                message: 'Profile picture updated',
            };
        }
        else {
            return {
                status: httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST,
                message: 'Missing required fields',
            };
        }
    }
    async editUserName(userDto) {
        if ((userDto._id && userDto.firstname, userDto.lastname)) {
            await this.userRepository.updateUserName(userDto._id, userDto.firstname, userDto.lastname);
            return {
                status: httpStatusCodes_1.HttpStatusCodes.OK,
                message: 'User profile updated',
            };
        }
        else {
            return {
                status: httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST,
                message: 'Missing required fields',
            };
        }
    }
    async editUserEmail(userDto) {
        if (userDto._id && userDto.email) {
            const otpResponse = await (0, otp_service_1.sendOtp)(userDto.email);
            if (!otpResponse.success) {
                return {
                    status: httpStatusCodes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
                    error: 'User registered, but failed to send OTP email',
                };
            }
            else {
                await this.userRepository.updateOtpByUserId(userDto._id, Number(otpResponse.otp));
                return {
                    status: httpStatusCodes_1.HttpStatusCodes.OK,
                    message: 'Verification Code send to your Email id',
                };
            }
        }
        else {
            return {
                status: httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST,
                message: 'Missing required fields',
            };
        }
    }
    async verifyEmail(userDto) {
        if (userDto.email) {
            const userData = await this.userRepository.findByEmail(userDto.email);
            if (userData) {
                const otpResponse = await (0, otp_service_1.sendOtp)(userData.email);
                await this.userRepository.updateOtpByUserId(userData._id, Number(otpResponse.otp));
                return {
                    email: userData.email,
                    status: httpStatusCodes_1.HttpStatusCodes.OK,
                    message: 'Email verified and code sent to your email',
                };
            }
            else {
                return {
                    status: httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST,
                    message: 'Invalid Email address',
                };
            }
        }
        else {
            return {
                status: httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST,
                message: 'Missing required fields',
            };
        }
    }
    async newPassword(userDto) {
        if (userDto.email && userDto.password) {
            const userData = await this.userRepository.findByEmail(userDto.email);
            if (userData) {
                const hashedPassword = await bcrypt.hash(userDto.password, 10);
                await this.userRepository.updatePassword(userDto.email, hashedPassword);
                return {
                    email: userData.email,
                    status: httpStatusCodes_1.HttpStatusCodes.OK,
                    message: 'Password changed Successfully',
                };
            }
            else {
                return {
                    status: httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST,
                    message: 'User not found',
                };
            }
        }
        else {
            return {
                status: httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST,
                message: 'Missing required fields',
            };
        }
    }
    async createBlog(createBlogDto) {
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
                    status: httpStatusCodes_1.HttpStatusCodes.CREATED,
                    message: 'Blog Created Successfully',
                };
            }
            else {
                return {
                    status: httpStatusCodes_1.HttpStatusCodes.NOT_FOUND,
                    message: 'User not found',
                };
            }
        }
        else {
            return {
                status: httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST,
                message: 'Missing Required fields',
            };
        }
    }
    async editBlog(editBlogDto) {
        if (editBlogDto) {
            const userData = await this.userRepository.findById(editBlogDto.userId);
            if (userData) {
                if (editBlogDto.topic === 'other' && editBlogDto.otherTopic) {
                    editBlogDto.topic = editBlogDto.otherTopic;
                }
                await this.blogRepository.update(editBlogDto._id, {
                    topic: editBlogDto.topic,
                    title: editBlogDto.title,
                    content: editBlogDto.content,
                    image: editBlogDto.image,
                });
                return {
                    status: httpStatusCodes_1.HttpStatusCodes.CREATED,
                    message: 'Blog Edited Successfully',
                };
            }
            else {
                return {
                    status: httpStatusCodes_1.HttpStatusCodes.NOT_FOUND,
                    message: 'User not found',
                };
            }
        }
        else {
            return {
                status: httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST,
                message: 'Missing Required fields',
            };
        }
    }
    async deleteBlog(_id) {
        await this.blogRepository.delete(_id);
        return {
            status: httpStatusCodes_1.HttpStatusCodes.OK,
            message: 'Deleted Successfully',
        };
    }
    async PersonalBlogs(userId) {
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
    async AllBlogs() {
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
    async SingleBlog(blogId) {
        const blogs = await this.blogRepository.singleBlog(blogId);
        if (!blogs) {
            throw new common_1.HttpException('Blog not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (!blogs.userId) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            userId: {
                _id: blogs.userId._id,
                firstname: blogs.userId.firstname,
                lastname: blogs.userId.lastname,
                email: blogs.userId.email,
            },
            _id: blogs._id,
            topic: blogs.topic,
            title: blogs.title,
            content: blogs.content,
            image: blogs.image,
            createdAt: blogs.createdAt ?? new Date(),
            updatedAt: blogs.updatedAt ?? new Date(),
        };
    }
};
exports.UserService = UserService;
__decorate([
    (0, common_1.Post)('refresh-token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "refreshToken", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_repository_1.UserRepository,
        blog_repository_1.BlogRepository])
], UserService);
//# sourceMappingURL=user.service.js.map