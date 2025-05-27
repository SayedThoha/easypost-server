import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpStatusCodes } from 'src/common/httpStatusCodes';
import { blogDto } from 'src/user/dto/blog.dto';
import { displayBlogDto } from 'src/user/dto/displayBlog.dto';
import { responseDto } from 'src/user/dto/response.dto';
import { BlogRepository } from 'src/user/repository/blog.repository';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class BlogService {
  constructor(
    private userRepository: UserRepository,
    private blogRepository: BlogRepository,
  ) {}

  async createBlog(createBlogDto: blogDto): Promise<responseDto> {
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
          status: HttpStatusCodes.CREATED,
          message: 'Blog Created Successfully',
        };
      } else {
        return {
          status: HttpStatusCodes.NOT_FOUND,
          message: 'User not found',
        };
      }
    } else {
      return {
        status: HttpStatusCodes.BAD_REQUEST,
        message: 'Missing Required fields',
      };
    }
  }

  async editBlog(editBlogDto: blogDto): Promise<responseDto> {
    if (editBlogDto) {
      const userData = await this.userRepository.findById(editBlogDto.userId);
      if (userData) {
        if (editBlogDto.topic === 'other' && editBlogDto.otherTopic) {
          editBlogDto.topic = editBlogDto.otherTopic;
        }
        await this.blogRepository.update(editBlogDto._id as string, {
          topic: editBlogDto.topic,
          title: editBlogDto.title,
          content: editBlogDto.content,
          image: editBlogDto.image,
        });
        return {
          status: HttpStatusCodes.CREATED,
          message: 'Blog Edited Successfully',
        };
      } else {
        return {
          status: HttpStatusCodes.NOT_FOUND,
          message: 'User not found',
        };
      }
    } else {
      return {
        status: HttpStatusCodes.BAD_REQUEST,
        message: 'Missing Required fields',
      };
    }
  }

  async deleteBlog(_id: string): Promise<responseDto> {
    await this.blogRepository.delete(_id);
    return {
      status: HttpStatusCodes.OK,
      message: 'Deleted Successfully',
    };
  }

  async personalBlogs(userId: string): Promise<displayBlogDto[]> {
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

  async allBlogs(): Promise<displayBlogDto[]> {
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

  async singleBlog(blogId: string): Promise<displayBlogDto> {
    const blogs = await this.blogRepository.singleBlog(blogId);
    if (!blogs) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }
    if (!blogs.userId) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
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
}
