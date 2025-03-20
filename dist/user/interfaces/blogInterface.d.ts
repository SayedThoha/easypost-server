import { Types } from 'mongoose';
import { userDto } from '../dto/user.dto';
export interface BlogDocument {
    userId: userDto;
    _id: Types.ObjectId;
    topic: string;
    title: string;
    content: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}
