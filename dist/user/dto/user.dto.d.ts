import { Types } from 'mongoose';
export declare class userDto {
    _id?: Types.ObjectId | string;
    firstName?: string;
    lastName?: string;
    email?: string;
    profilePicture?: string;
    password?: string;
}
