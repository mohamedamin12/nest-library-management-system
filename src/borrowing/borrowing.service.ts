import { Injectable } from '@nestjs/common';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { UpdateBorrowingDto } from './dto/update-borrowing.dto';

@Injectable()
export class BorrowingService {
  create(createBorrowingDto: CreateBorrowingDto) {
    return 'This action adds a new borrowing';
  }

  findAll() {
    return `This action returns all borrowing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} borrowing`;
  }

  update(id: number, updateBorrowingDto: UpdateBorrowingDto) {
    return `This action updates a #${id} borrowing`;
  }

  remove(id: number) {
    return `This action removes a #${id} borrowing`;
  }
}
