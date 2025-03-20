import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Blog } from '../schema/blog.schema';
import { Injectable } from '@nestjs/common';
import { blogDto } from '../dto/blog.dto';
import { BlogDocument } from '../interfaces/blogInterface';
import { IBlogRepository } from './IBlogRepository';
@Injectable()
export class BlogRepository implements IBlogRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async create(blogData: Partial<blogDto>): Promise<Blog> {
    const createdBlog = new this.blogModel(blogData);
    return createdBlog.save();
  }

  async update(
    blogId: string,
    updateData: Partial<blogDto>,
  ): Promise<Blog | null> {
    return this.blogModel.findByIdAndUpdate(blogId, { $set: updateData });
  }

  async delete(blogId: string): Promise<Blog | null> {
    return this.blogModel.findByIdAndDelete(blogId);
  }

  async personalBlogs(userId: string) {
    const blogs = await this.blogModel
      .find({ userId: userId })
      .populate('userId')
      .lean<BlogDocument[]>();
    return blogs;
  }

  async allBlogs() {
    const blogs = await this.blogModel
      .find()
      .populate('userId')
      .lean<BlogDocument[]>();
    return blogs;
  }

  async singleBlog(blogId: string) {
    const blogs = await this.blogModel
      .findById(blogId)
      .populate<{
        userId: {
          _id: Types.ObjectId;
          firstname: string;
          lastname: string;
          email: string;
        };
      }>('userId')
      .lean();

    return blogs;
  }
}
