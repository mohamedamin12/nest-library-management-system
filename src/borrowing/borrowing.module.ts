import { Module } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { BorrowingController } from './borrowing.controller';

@Module({
  controllers: [BorrowingController],
  providers: [BorrowingService],
})
export class BorrowingModule {}
