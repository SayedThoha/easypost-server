import { blogDto } from 'src/user/dto/blog.dto';
import { displayBlogDto } from 'src/user/dto/displayBlog.dto';
import { responseDto } from 'src/user/dto/response.dto';
import { IBlogService } from 'src/user/service/blog/IBlog.service';
export declare class BlogController {
    private blogService;
    constructor(blogService: IBlogService);
    createBlog(blogDto: blogDto): Promise<responseDto>;
    editBlog(blogDto: blogDto): Promise<responseDto>;
    deleteBlog(blogId: string): Promise<responseDto>;
    personalBlogs(userId: string): Promise<displayBlogDto[]>;
    allBlogs(): Promise<displayBlogDto[]>;
    singleBlog(blogId: string): Promise<displayBlogDto>;
}
