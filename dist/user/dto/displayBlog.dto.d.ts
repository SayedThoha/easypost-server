import { userDto } from './user.dto';
import { Types } from 'mongoose';
export declare class displayBlogDto {
    userId: userDto;
    _id: Types.ObjectId;
    topic: string;
    title: string;
    content: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}
