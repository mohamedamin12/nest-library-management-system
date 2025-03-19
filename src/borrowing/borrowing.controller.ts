import {
  Controller,
  Get,
  Post,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';

import { RolesEnum } from 'src/user/enum/roles';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';


@ApiBearerAuth('access_token')
@ApiTags('Borrowing')
@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @ApiOperation({ summary: 'Borrow a book by its ID' })
  @ApiParam({ name: 'bookId', description: 'ID of the book to borrow' })
  @UseGuards(AuthGuard)
  @Post('borrow/:bookId')
  async bookBorrow(@Param('bookId') bookId: string, @Request() req) {
    return this.borrowingService.borrowBook(req.user.sub, bookId);
  }

  @ApiOperation({ summary: 'Return a borrowed book by its borrowing ID' })
  @ApiParam({ name: 'borrowingId', description: 'ID of the borrowing record' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Post('return/:borrowingId')
  returnBook(@Param('borrowingId') borrowingId: string, @Request() req) {
    return this.borrowingService.returnBook(borrowingId, req.user);
  }

  @ApiOperation({ summary: 'Get all borrowing records' })
  @Get('all')
  async find() {
    return this.borrowingService.getAllBorrow();
  }

  @ApiOperation({ summary: 'Get all borrowing records of a user by user ID' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @UseGuards(AuthGuard)
  @Get('user/:userId')
  async userBorrowing(@Param('userId') userId: string, @Request() req) {
    return this.borrowingService.userBorrowing(userId, req.user);
  }

  @ApiOperation({ summary: 'Get borrowing record by its ID' })
  @ApiParam({ name: 'id', description: 'ID of the borrowing record' })
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string, @Request() req) {
    return this.borrowingService.findById(id, req.user);
  }
}
