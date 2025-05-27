import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { IUserRepository } from './IUserRepository';
import { BaseRepository } from './base.repository';
export declare class UserRepository extends BaseRepository<User> implements IUserRepository {
    private userModel;
    constructor(userModel: Model<User>);
    updateUser(email: string, otp: number): Promise<void>;
    updateUserEmail(userId: string, newEmail: string): Promise<void>;
    updateProfilePicture(userId: string, profilePicture: string): Promise<void>;
    updateUserName(userId: string, firstName: string, lastName: string): Promise<void>;
    updateOtpByUserId(userId: string, otp: number): Promise<void>;
    updatePassword(email: string, hashedPassword: string): Promise<void>;
}
