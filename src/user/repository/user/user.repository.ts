import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUserRepository } from './IUser.Repository';
import { BaseRepository } from '../base/base.repository';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findUsersByEmail(email: string): Promise<User[]> {
    return this.userModel.find({ email });
  }

  async updateUser(email: string, otp: number): Promise<void> {
    await this.userModel.updateOne(
      { email },
      { $set: { otp: otp, otpSendTime: Date.now() } },
    );
  }

  async updateUserEmail(userId: string, newEmail: string): Promise<void> {
    await this.update(userId, { email: newEmail });
  }

  async updateProfilePicture(
    userId: string,
    profilePicture: string,
  ): Promise<void> {
    await this.update(userId, { profilePicture });
  }

  async updateUserName(
    userId: string,
    firstName: string,
    lastName: string,
  ): Promise<void> {
    await this.update(userId, { firstName, lastName });
  }

  async updateOtpByUserId(userId: string, otp: number): Promise<void> {
    await this.update(userId, { otp, otpSendTime: new Date() });
  }

  async updatePassword(email: string, hashedPassword: string): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
    );
  }
}
