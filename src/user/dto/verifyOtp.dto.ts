import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class verifyOtpDto {
  @IsNumber()
  @IsNotEmpty()
  otp: number;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  newEmail?: string;

  @IsBoolean()
  @IsOptional()
  isForgotPassword?: boolean;
}
