import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ description: 'author name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({ description: 'author nationality' })
  @IsString()
  @IsNotEmpty()
  readonly nationality: string;
  @ApiProperty({ description: 'author bio' })
  @IsString()
  @IsNotEmpty()
  readonly bio: string;
}