import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BorrowingDto } from './dto/create-borrowing.dto';
import { BookService } from '../book/book.service';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectModel('Borrowing')
    private readonly borrowingModel: Model<BorrowingDto>,
    private readonly bookService: BookService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async borrowBook(userId: string, bookId: string) {
    const book = await this.bookService.findOne(bookId);
    if (!book) throw new NotFoundException('Book not found');
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('user not found');

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // Borrow period of 14 days

    const borrowing = new this.borrowingModel({
      userId,
      bookId,
      borrowDate: new Date(),
      dueDate,
    });
    return await borrowing.save();
  }
  async getAllBorrow() {
    const borrowingList = await this.borrowingModel.find().populate('userId');
    return borrowingList;
  }

  async userBorrowing(userId, currentUser) {

    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('user not found');
    if (
      !(await this.authService.thisIsMe(currentUser, user)) &&
      !(await this.authService.thisIsAdmin(currentUser))
    ) {
      throw new UnauthorizedException(
        'You are not authorized to access this route.',
      );
    }
    const borrowingList = await this.borrowingModel
      .find({ userId })
      .populate('userId');
    return borrowingList;
  }
  async findById(id, currentUser) {

    const borrowing = await this.borrowingModel.findById(id);
    if (!borrowing) throw new NotFoundException('this item not found');
    const userId=borrowing.userId.toString();
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('user not found');
    if (
      !(await this.authService.thisIsMe(currentUser, user)) &&
      !(await this.authService.thisIsAdmin(currentUser))
    ) {
      throw new UnauthorizedException(
        'You are not authorized to access this route.',
      );
    }
    const borrowingList = await this.borrowingModel
      .findById(id)
      .populate('userId');
    return borrowingList;
  }

  async returnBook(borrowingId: string,currentUser) {
      const borrowing = await this.borrowingModel.findById(borrowingId);
      if (!borrowing) throw new NotFoundException('Borrowing record not found');
      if(!this.authService.thisIsAdmin(currentUser)){
        throw new UnauthorizedException(
          'You are not authorized to access this route.',
        );
      }
      const now = new Date();
      const fine = this.calculateFine(borrowing.dueDate, now);
      borrowing.returnDate = now;
      borrowing.fineAmount = fine;
      return await borrowing.save();
    }
    private calculateFine(dueDate: Date, returnDate: Date): number {
      const daysLate = Math.ceil((returnDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));
      return daysLate > 0 ? daysLate * 2 : 0; // Fine of $2 per late day
    }
  }

