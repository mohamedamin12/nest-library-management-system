import { IsNotEmpty, IsMongoId, IsDateString, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BorrowingDto {
  @ApiProperty({
    description: 'The ID of the book being borrowed',
    example: '66db1a93b6f28108e21cd51a',
  })
  @IsNotEmpty()
  @IsMongoId()
  bookId: string;

  @ApiProperty({
    description: 'The ID of the user borrowing the book',
    example: '66eac75eb1963069cdbdb5b2',
  })
  @IsOptional()
  @IsMongoId()
  userId: string;

  @ApiPropertyOptional({
    description: 'The due date for returning the book (ISO format)',
    example: '2024-09-17T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  dueDate: Date;

  @ApiPropertyOptional({
    description: 'The date when the book was returned (ISO format)',
    example: '2024-10-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  returnDate?: Date;

  @ApiPropertyOptional({
    description: 'The fine amount (if applicable)',
    example: 10,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  fineAmount?: number;
}