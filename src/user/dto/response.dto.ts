import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class responseDto {
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsOptional()
  error?: string;

  @IsString()
  @IsOptional()
  accessToken?: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;

  @IsString()
  @IsOptional()
  accessedUser?: unknown;

  @IsString()
  @IsOptional()
  email?: string;
}
