import { IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class userDto {
  _id?: Types.ObjectId | string;

  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

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
