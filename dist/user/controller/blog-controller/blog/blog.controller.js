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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const customHttpExceptionFilter_1 = require("../../../../common/customHttpExceptionFilter");
const blog_dto_1 = require("../../../dto/blog.dto");
const IBlog_service_1 = require("../../../service/blog/IBlog.service");
let BlogController = class BlogController {
    blogService;
    constructor(blogService) {
        this.blogService = blogService;
    }
    async createBlog(blogDto) {
        return await this.blogService.createBlog(blogDto);
    }
    async editBlog(blogDto) {
        return await this.blogService.editBlog(blogDto);
    }
    async deleteBlog(blogId) {
        return await this.blogService.deleteBlog(blogId);
    }
    async personalBlogs(userId) {
        return await this.blogService.personalBlogs(userId);
    }
    async allBlogs() {
        return await this.blogService.allBlogs();
    }
    async singleBlog(blogId) {
        return await this.blogService.singleBlog(blogId);
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, common_1.Post)('createBlog'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.blogDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "createBlog", null);
__decorate([
    (0, common_1.Put)('editBlog'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.blogDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "editBlog", null);
__decorate([
    (0, common_1.Delete)('deleteBlog/:blogId'),
    __param(0, (0, common_1.Param)('blogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deleteBlog", null);
__decorate([
    (0, common_1.Get)('personalBlogs/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "personalBlogs", null);
__decorate([
    (0, common_1.Get)('allBlogs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "allBlogs", null);
__decorate([
    (0, common_1.Get)('singleBlog/:blogId'),
    __param(0, (0, common_1.Param)('blogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "singleBlog", null);
exports.BlogController = BlogController = __decorate([
    (0, common_1.Controller)('blog'),
    (0, common_1.UseFilters)(new customHttpExceptionFilter_1.CustomHttpExceptionFilter()),
    __metadata("design:paramtypes", [IBlog_service_1.IBlogService])
], BlogController);
//# sourceMappingURL=blog.controller.js.map