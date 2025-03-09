import { Types } from 'mongoose';
export declare class userDto {
    _id?: Types.ObjectId | string;
    firstname?: string;
    lastname?: string;
    email?: string;
    profilePicture?: string;
    password?: string;
}
