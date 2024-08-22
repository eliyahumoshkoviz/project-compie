import { IsEmail, IsOptional, IsString, IsBoolean, IsInt } from 'class-validator';

export class UpdateUserDto {

  @IsString()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsInt()
  @IsOptional()
  role_id: number;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;
  
}
