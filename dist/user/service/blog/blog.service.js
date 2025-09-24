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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const httpStatusCodes_1 = require("../../../common/httpStatusCodes");
const IBlog_Repository_1 = require("../../repository/blog/IBlog.Repository");
const IUser_Repository_1 = require("../../repository/user/IUser.Repository");
let BlogService = class BlogService {
    userRepository;
    blogRepository;
    constructor(userRepository, blogRepository) {
        this.userRepository = userRepository;
        this.blogRepository = blogRepository;
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
    async personalBlogs(userId) {
        const blogs = await this.blogRepository.personalBlogs(userId);
        return blogs.map((blog) => ({
            userId: {
                _id: blog.userId._id,
                firstName: blog.userId.firstName,
                lastName: blog.userId.lastName,
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
    async allBlogs() {
        const blogs = await this.blogRepository.allBlogs();
        return blogs.map((blog) => ({
            userId: {
                _id: blog.userId._id,
                firstName: blog.userId.firstName,
                lastName: blog.userId.lastName,
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
    async singleBlog(blogId) {
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
                firstName: blogs.userId.firstName,
                lastName: blogs.userId.lastName,
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
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [IUser_Repository_1.IUserRepository,
        IBlog_Repository_1.IBlogRepository])
], BlogService);
//# sourceMappingURL=blog.service.js.map