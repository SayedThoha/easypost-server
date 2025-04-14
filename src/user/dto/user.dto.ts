import { IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class userDto {
  _id?: Types.ObjectId | string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
