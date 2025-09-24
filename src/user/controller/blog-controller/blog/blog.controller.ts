import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CustomHttpExceptionFilter } from 'src/common/customHttpExceptionFilter';
import { blogDto } from 'src/user/dto/blog.dto';
import { displayBlogDto } from 'src/user/dto/displayBlog.dto';
import { responseDto } from 'src/user/dto/response.dto';
import { IBlogService } from 'src/user/service/blog/IBlog.service';

@Controller('blog')
@UseFilters(new CustomHttpExceptionFilter())
export class BlogController {
  constructor(private blogService: IBlogService) {}

  @Post('createBlog')
  async createBlog(@Body() blogDto: blogDto): Promise<responseDto> {
    return await this.blogService.createBlog(blogDto);
  }
  @Put('editBlog')
  async editBlog(@Body() blogDto: blogDto): Promise<responseDto> {
    return await this.blogService.editBlog(blogDto);
  }
  @Delete('deleteBlog/:blogId')
  async deleteBlog(@Param('blogId') blogId: string): Promise<responseDto> {
    return await this.blogService.deleteBlog(blogId);
  }
  @Get('personalBlogs/:userId')
  async personalBlogs(
    @Param('userId') userId: string,
  ): Promise<displayBlogDto[]> {
    return await this.blogService.personalBlogs(userId);
  }
  @Get('allBlogs')
  async allBlogs(): Promise<displayBlogDto[]> {
    return await this.blogService.allBlogs();
  }
  @Get('singleBlog/:blogId')
  async singleBlog(@Param('blogId') blogId: string): Promise<displayBlogDto> {
    return await this.blogService.singleBlog(blogId);
  }
}
