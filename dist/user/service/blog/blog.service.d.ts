import { blogDto } from 'src/user/dto/blog.dto';
import { displayBlogDto } from 'src/user/dto/displayBlog.dto';
import { responseDto } from 'src/user/dto/response.dto';
import { IBlogRepository } from 'src/user/repository/blog/IBlog.Repository';
import { IUserRepository } from 'src/user/repository/user/IUser.Repository';
export declare class BlogService {
    private userRepository;
    private blogRepository;
    constructor(userRepository: IUserRepository, blogRepository: IBlogRepository);
    createBlog(createBlogDto: blogDto): Promise<responseDto>;
    editBlog(editBlogDto: blogDto): Promise<responseDto>;
    deleteBlog(_id: string): Promise<responseDto>;
    personalBlogs(userId: string): Promise<displayBlogDto[]>;
    allBlogs(): Promise<displayBlogDto[]>;
    singleBlog(blogId: string): Promise<displayBlogDto>;
}
