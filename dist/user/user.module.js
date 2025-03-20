"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_Strategy_1 = require("./strategy/jwt.Strategy");
const blog_schema_1 = require("./schema/blog.schema");
const user_service_1 = require("./service/user/user.service");
const user_controller_controller_1 = require("./controller/user-controller/user-controller.controller");
const user_repository_1 = require("./repository/user.repository");
const blog_repository_1 = require("./repository/blog.repository");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: blog_schema_1.Blog.name, schema: blog_schema_1.BlogSchema },
            ]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || '9645743868',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        providers: [user_service_1.UserService, jwt_Strategy_1.JwtStrategy, user_repository_1.UserRepository, blog_repository_1.BlogRepository],
        controllers: [user_controller_controller_1.UserControllerController],
        exports: [user_service_1.UserService, user_repository_1.UserRepository, blog_repository_1.BlogRepository],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map