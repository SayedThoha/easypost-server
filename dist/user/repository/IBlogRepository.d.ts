import { BlogDocument } from '../interfaces/blogInterface';
export interface IBlogRepository {
    personalBlogs(userId: string): Promise<BlogDocument[]>;
    allBlogs(): Promise<BlogDocument[]>;
    singleBlog(blogId: string): Promise<BlogDocument | null>;
}
