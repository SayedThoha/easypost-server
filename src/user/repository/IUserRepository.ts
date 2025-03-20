import { User } from '../schema/user.schema';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(userData: Partial<User>): Promise<User>;
  updateUser(email: string, otp: number): Promise<void>;
  findUsersByEmail(email: string): Promise<User[]>;
  updateUserEmail(userId: string, newEmail: string): Promise<void>;
  findById(userId: string): Promise<User | null>;
  updateProfilePicture(userId: string, profilePicture: string): Promise<void>;
  updateUserName(
    userId: string,
    firstname: string,
    lastname: string,
  ): Promise<void>;
  updateOtpByUserId(userId: string, otp: number): Promise<void>;
  updatePassword(email: string, hashedPassword: string): Promise<void>;
}
