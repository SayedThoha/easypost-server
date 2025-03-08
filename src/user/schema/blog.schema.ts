import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema({
  timestamps: true, //createdAt and updatedAt fields
})
export class Blog extends Document {
  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  image: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true }) // Reference to User
  userId: Types.ObjectId; // Use ObjectId type for referencing

  // Declare createdAt and updatedAt explicitly
  createdAt?: Date;
  updatedAt?: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
