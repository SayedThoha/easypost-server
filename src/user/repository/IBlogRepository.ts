import { blogDto } from '../dto/blog.dto';
import { BlogDocument } from '../interfaces/blogInterface';
import { Blog } from '../schema/blog.schema';

export interface IBlogRepository {
  create(blogData: Partial<blogDto>): Promise<Blog>;
  update(blogId: string, updateData: Partial<blogDto>): Promise<Blog | null>;
  delete(blogId: string): Promise<Blog | null>;
  personalBlogs(userId: string): Promise<BlogDocument[]>;
  allBlogs(): Promise<BlogDocument[]>;
}
