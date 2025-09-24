import { blogDto } from 'src/user/dto/blog.dto';
import { displayBlogDto } from 'src/user/dto/displayBlog.dto';
import { responseDto } from 'src/user/dto/response.dto';

export abstract class IBlogService {
  abstract createBlog(createBlogDto: blogDto): Promise<responseDto>;
  abstract editBlog(editBlogDto: blogDto): Promise<responseDto>;
  abstract deleteBlog(_id: string): Promise<responseDto>;
  abstract personalBlogs(userId: string): Promise<displayBlogDto[]>;
  abstract allBlogs(): Promise<displayBlogDto[]>;
  abstract singleBlog(blogId: string): Promise<displayBlogDto>;
}
