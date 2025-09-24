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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllerController = void 0;
const common_1 = require("@nestjs/common");
const customHttpExceptionFilter_1 = require("../../../common/customHttpExceptionFilter");
const httpStatusCodes_1 = require("../../../common/httpStatusCodes");
const login_dto_1 = require("../../dto/login.dto");
const registration_dto_1 = require("../../dto/registration.dto");
const user_dto_1 = require("../../dto/user.dto");
const verifyOtp_dto_1 = require("../../dto/verifyOtp.dto");
const IUser_service_1 = require("../../service/user/IUser.service");
let UserControllerController = class UserControllerController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async userRegistration(registrationDto) {
        const response = await this.userService.userRegistration(registrationDto);
        if (response.status === httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST) {
            throw new common_1.HttpException(response.error ?? 'An error occurred', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    }
    async resendOtp(email) {
        return await this.userService.resendOtp(email);
    }
    async verifyOtp(verifyOtpDto) {
        return await this.userService.verifyOtp(verifyOtpDto);
    }
    async login(loginDto) {
        return await this.userService.login(loginDto);
    }
    async refreshToken(refreshToken) {
        return await this.userService.refreshToken(refreshToken);
    }
    async userDetails(_id) {
        return await this.userService.userDetails(_id);
    }
    async changeProfilePicture(userDto) {
        return await this.userService.changeProfilePicture(userDto);
    }
    async editUserName(userDto) {
        return await this.userService.editUserName(userDto);
    }
    async editUserEmail(userDto) {
        return await this.userService.editUserEmail(userDto);
    }
    async verifyEmail(userDto) {
        return await this.userService.verifyEmail(userDto);
    }
    async newPassword(userDto) {
        return await this.userService.newPassword(userDto);
    }
};
exports.UserControllerController = UserControllerController;
__decorate([
    (0, common_1.Post)('userRegister'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registration_dto_1.registrationDto]),
    __metadata("design:returntype", Promise)
], UserControllerController.prototype, "userRegistration", null);
__decorate([
    (0, common_1.Post)('resendOtp'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserControllerController.prototype, "resendOtp", null);
__decorate([
    (0, common_1.Post)('verifyOtp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verifyOtp_dto_1.verifyOtpDto]),
    __metadata("design:returntype", Promise)
], UserControllerController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.loginDto]),
    __metadata("design:returntype", Promise)
], UserControllerController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refreshToken'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserControllerController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Get)('userDetails/:_id'),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserControllerController.prototype, "userDetails", null);
__decorate([
    (0, common_1.Post)('changeProfilePicture'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.userDto]),
    __metadata("design:returntype", Promise)
], UserControllerController.prototype, "changeProfilePicture", null);
__decorate([
    (0, common_1.Patch)('editUserName'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.userDto]),
    __metadata("design:returntype", Promise)
], UserControllerController.prototype, "editUserName", null);
__decorate([
    (0, common_1.Post)('editUserEmail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.userDto]),
    __metadata("design:returntype", Promise)
], UserControllerController.prototype, "editUserEmail", null);
__decorate([
    (0, common_1.Post)('verifyEmail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.userDto]),
    __metadata("design:returntype", Promise)
], UserControllerController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Patch)('newPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.userDto]),
    __metadata("design:returntype", Promise)
], UserControllerController.prototype, "newPassword", null);
exports.UserControllerController = UserControllerController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseFilters)(new customHttpExceptionFilter_1.CustomHttpExceptionFilter()),
    __metadata("design:paramtypes", [IUser_service_1.IUserService])
], UserControllerController);
//# sourceMappingURL=user-controller.controller.js.map