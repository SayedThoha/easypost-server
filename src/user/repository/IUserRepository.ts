import { User } from '../schema/user.schema';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findUsersByEmail(email: string): Promise<User[]>;
  updateUser(email: string, otp: number): Promise<void>;
  updateUserEmail(userId: string, newEmail: string): Promise<void>;
  updateProfilePicture(userId: string, profilePicture: string): Promise<void>;
  updateUserName(
    userId: string,
    firstName: string,
    lastName: string,
  ): Promise<void>;
  updateOtpByUserId(userId: string, otp: number): Promise<void>;
  updatePassword(email: string, hashedPassword: string): Promise<void>;
}
