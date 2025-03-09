import { Document, Types } from 'mongoose';
export declare class Blog extends Document {
    topic: string;
    title: string;
    content: string;
    image: string;
    userId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const BlogSchema: import("mongoose").Schema<Blog, import("mongoose").Model<Blog, any, any, any, Document<unknown, any, Blog> & Blog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Blog, Document<unknown, {}, import("mongoose").FlatRecord<Blog>> & import("mongoose").FlatRecord<Blog> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
