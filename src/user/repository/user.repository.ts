import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUserRepository } from './IUserRepository';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel);
  }

  async updateUser(email: string, otp: number): Promise<void> {
    await this.userModel.updateOne(
      { email },
      { $set: { otp: otp, otpSendTime: Date.now() } },
    );
  }

  async updateUserEmail(userId: string, newEmail: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $set: { email: newEmail },
    });
  }

  async updateProfilePicture(
    userId: string,
    profilePicture: string,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $set: { profilePicture },
    });
  }

  async updateUserName(
    userId: string,
    firstName: string,
    lastName: string,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $set: { firstName, lastName },
    });
  }

  async updateOtpByUserId(userId: string, otp: number): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $set: { otp, otpSendTime: Date.now() },
    });
  }

  async updatePassword(email: string, hashedPassword: string): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
    );
  }
}
