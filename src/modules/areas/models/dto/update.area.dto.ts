import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateAreaDto {

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsInt()
  @IsOptional()
  population: number;
}
