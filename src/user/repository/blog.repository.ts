import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Blog } from '../schema/blog.schema';
import { Injectable } from '@nestjs/common';
import { BlogDocument } from '../interfaces/blogInterface';
import { IBlogRepository } from './IBlogRepository';
import { BaseRepository } from './base.repository';
@Injectable()
export class BlogRepository
  extends BaseRepository<Blog>
  implements IBlogRepository
{
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {
    super(blogModel);
  }

  async personalBlogs(userId: string): Promise<BlogDocument[]> {
    const blogs = await this.blogModel
      .find({ userId: userId })
      .populate('userId')
      .lean<BlogDocument[]>();
    return blogs;
  }

  async allBlogs(): Promise<BlogDocument[]> {
    const blogs = await this.blogModel
      .find()
      .populate('userId')
      .lean<BlogDocument[]>();
    return blogs;
  }

  async singleBlog(blogId: string): Promise<BlogDocument | null> {
    const blogs = await this.blogModel
      .findById(blogId)
      .populate<{
        userId: {
          _id: Types.ObjectId;
          firstName: string;
          lastName: string;
          email: string;
        };
      }>('userId')
      .lean<BlogDocument>();

    return blogs;
  }
}
