import { IsString, IsNumber, IsOptional } from 'class-validator';

export class SearchAreaDto {
  
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsNumber()
  @IsOptional()
  population: number;
}
