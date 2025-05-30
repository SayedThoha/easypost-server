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
exports.BlogRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blog_schema_1 = require("../schema/blog.schema");
const common_1 = require("@nestjs/common");
const base_repository_1 = require("./base.repository");
let BlogRepository = class BlogRepository extends base_repository_1.BaseRepository {
    blogModel;
    constructor(blogModel) {
        super(blogModel);
        this.blogModel = blogModel;
    }
    async personalBlogs(userId) {
        const blogs = await this.blogModel
            .find({ userId: userId })
            .populate('userId')
            .lean();
        return blogs;
    }
    async allBlogs() {
        const blogs = await this.blogModel
            .find()
            .populate('userId')
            .lean();
        return blogs;
    }
    async singleBlog(blogId) {
        const blogs = await this.blogModel
            .findById(blogId)
            .populate('userId')
            .lean();
        return blogs;
    }
};
exports.BlogRepository = BlogRepository;
exports.BlogRepository = BlogRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlogRepository);
//# sourceMappingURL=blog.repository.js.map