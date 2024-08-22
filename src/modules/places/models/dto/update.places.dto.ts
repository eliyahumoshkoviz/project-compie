import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdatePlacesDto {

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsOptional()
  area_id: number;
}
