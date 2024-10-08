import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExampleRequestDto {
  @IsOptional()
  @ApiProperty()
  example: string;
}
