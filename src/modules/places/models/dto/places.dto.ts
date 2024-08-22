import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePlacesDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  area_id: number;
}
