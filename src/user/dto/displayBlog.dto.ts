import { IsString, IsNotEmpty } from 'class-validator';
import { userDto } from './user.dto';
import { Types } from 'mongoose';

export class displayBlogDto {
  userId: userDto;

  _id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;
}
