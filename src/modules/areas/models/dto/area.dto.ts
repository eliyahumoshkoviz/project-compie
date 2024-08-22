import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  country: string;

  @IsNumber()
  @IsOptional()
  population?: number;
}
