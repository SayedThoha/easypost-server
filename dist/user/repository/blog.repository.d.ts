import { Model, Types } from 'mongoose';
import { Blog } from '../schema/blog.schema';
import { blogDto } from '../dto/blog.dto';
import { BlogDocument } from '../interfaces/blogInterface';
import { IBlogRepository } from './IBlogRepository';
export declare class BlogRepository implements IBlogRepository {
    private blogModel;
    constructor(blogModel: Model<Blog>);
    create(blogData: Partial<blogDto>): Promise<Blog>;
    update(blogId: string, updateData: Partial<blogDto>): Promise<Blog | null>;
    delete(blogId: string): Promise<Blog | null>;
    personalBlogs(userId: string): Promise<BlogDocument[]>;
    allBlogs(): Promise<BlogDocument[]>;
    singleBlog(blogId: string): Promise<(import("mongoose").FlattenMaps<Omit<Blog, "userId"> & {
        userId: {
            _id: Types.ObjectId;
            firstname: string;
            lastname: string;
            email: string;
        };
    }> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    }) | null>;
}
