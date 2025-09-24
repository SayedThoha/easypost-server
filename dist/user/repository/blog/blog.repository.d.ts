import { Model } from 'mongoose';
import { Blog } from '../../schema/blog.schema';
import { BlogDocument } from '../../interfaces/blogInterface';
import { IBlogRepository } from './IBlog.Repository';
import { BaseRepository } from '../base/base.repository';
export declare class BlogRepository extends BaseRepository<Blog> implements IBlogRepository {
    private blogModel;
    constructor(blogModel: Model<Blog>);
    personalBlogs(userId: string): Promise<BlogDocument[]>;
    allBlogs(): Promise<BlogDocument[]>;
    singleBlog(blogId: string): Promise<BlogDocument | null>;
}
