import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class SearchPlacesDto {
  
  @IsString()
  @IsOptional()
  name: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  area_id: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  id: number;
}
