import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsNumber, IsOptional, IsMongoId } from 'class-validator';

export class CreateBookDto {
  
  @ApiProperty({ description: 'The title of the book' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ description: 'The ID of the author', example: '60f1b2bc72f8141d3cabc01a' })
  @IsMongoId()
  @IsNotEmpty()
  readonly author_id: string;

  @ApiProperty({ description: 'Published date of the book', example: '1925-04-10', required: false })
  @IsDateString()
  @IsOptional()
  readonly publishedDate?: string;

  @ApiProperty({ description: 'Number of pages in the book' })
  @IsNumber()
  @IsNotEmpty()
  readonly pages: number;

  @ApiProperty({ description: 'ISBN number of the book', required: false })
  @IsString()
  @IsOptional()
   isbn?: string;

  @ApiProperty({ description: 'Number of available copies in the library' })
  @IsNumber()
  @IsNotEmpty()
  readonly available_copies: number;

  @ApiProperty({ description: 'Total number of copies of the book' })
  @IsNumber()
  @IsNotEmpty()
  readonly total_copies: number;

  @ApiProperty({ description: 'Category ID of the book', example: '60f1b2bc72f8141d3cabc01b', required: false })
  @IsMongoId()
  @IsOptional()
  readonly category_id?: string;
}