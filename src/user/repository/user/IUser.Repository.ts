import { User } from '../../schema/user.schema';
import { IBaseRepository } from '../base/IBase.Repository';

export abstract class IUserRepository extends IBaseRepository<User> {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findUsersByEmail(email: string): Promise<User[]>;
  abstract updateUser(email: string, otp: number): Promise<void>;
  abstract updateUserEmail(userId: string, newEmail: string): Promise<void>;
  abstract updateProfilePicture(
    userId: string,
    profilePicture: string,
  ): Promise<void>;
  abstract updateUserName(
    userId: string,
    firstName: string,
    lastName: string,
  ): Promise<void>;
  abstract updateOtpByUserId(userId: string, otp: number): Promise<void>;
  abstract updatePassword(email: string, hashedPassword: string): Promise<void>;
}
