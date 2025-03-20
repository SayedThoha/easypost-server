import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { IUserRepository } from './IUserRepository';
export declare class UserRepository implements IUserRepository {
    private userModel;
    constructor(userModel: Model<User>);
    findByEmail(email: string): Promise<User | null>;
    createUser(userData: Partial<User>): Promise<User>;
    updateUser(email: string, otp: number): Promise<void>;
    findUsersByEmail(email: string): Promise<User[]>;
    updateUserEmail(userId: string, newEmail: string): Promise<void>;
    findById(userId: string): Promise<User | null>;
    updateProfilePicture(userId: string, profilePicture: string): Promise<void>;
    updateUserName(userId: string, firstname: string, lastname: string): Promise<void>;
    updateOtpByUserId(userId: string, otp: number): Promise<void>;
    updatePassword(email: string, hashedPassword: string): Promise<void>;
}
