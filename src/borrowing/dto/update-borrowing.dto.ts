import { PartialType } from '@nestjs/swagger';
import { CreateBorrowingDto } from './create-borrowing.dto';

export class UpdateBorrowingDto extends PartialType(CreateBorrowingDto) {}
