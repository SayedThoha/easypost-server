import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUserRepository } from './IUserRepository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async updateUser(email: string, otp: number): Promise<void> {
    await this.userModel.updateOne(
      { email },
      { $set: { otp: otp, otpSendTime: Date.now() } },
    );
  }

  async findUsersByEmail(email: string): Promise<User[]> {
    return this.userModel.find({ email });
  }

  async updateUserEmail(userId: string, newEmail: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $set: { email: newEmail },
    });
  }
  async findById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId);
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
    firstname: string,
    lastname: string,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $set: { firstname, lastname },
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
