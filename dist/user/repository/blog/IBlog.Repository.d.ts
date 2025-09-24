import { Blog } from 'src/user/schema/blog.schema';
import { BlogDocument } from '../../interfaces/blogInterface';
import { IBaseRepository } from '../base/IBase.Repository';
export declare abstract class IBlogRepository extends IBaseRepository<Blog> {
    abstract personalBlogs(userId: string): Promise<BlogDocument[]>;
    abstract allBlogs(): Promise<BlogDocument[]>;
    abstract singleBlog(blogId: string): Promise<BlogDocument | null>;
}
