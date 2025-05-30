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
exports.UserRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../schema/user.schema");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("./base.repository");
let UserRepository = class UserRepository extends base_repository_1.BaseRepository {
    userModel;
    constructor(userModel) {
        super(userModel);
        this.userModel = userModel;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email });
    }
    async findUsersByEmail(email) {
        return this.userModel.find({ email });
    }
    async updateUser(email, otp) {
        await this.userModel.updateOne({ email }, { $set: { otp: otp, otpSendTime: Date.now() } });
    }
    async updateUserEmail(userId, newEmail) {
        await this.update(userId, { email: newEmail });
    }
    async updateProfilePicture(userId, profilePicture) {
        await this.update(userId, { profilePicture });
    }
    async updateUserName(userId, firstName, lastName) {
        await this.update(userId, { firstName, lastName });
    }
    async updateOtpByUserId(userId, otp) {
        await this.update(userId, { otp, otpSendTime: new Date() });
    }
    async updatePassword(email, hashedPassword) {
        await this.userModel.findOneAndUpdate({ email }, { $set: { password: hashedPassword } });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepository);
//# sourceMappingURL=user.repository.js.map