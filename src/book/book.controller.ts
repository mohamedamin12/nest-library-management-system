import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Request,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { RolesEnum } from 'src/user/enum/roles';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@ApiBearerAuth('access_token')
@ApiTags('Books')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  
  @Get('search')
  @ApiQuery({ name: 'title', required: false, description: 'Search by book title' })
  @ApiQuery({ name: 'author', required: false, description: 'Search by author ID' })
  @ApiQuery({ name: 'category', required: false, description: 'Search by category ID' })
  @ApiQuery({ name: 'isbn', required: false, description: 'Search by ISBN' })  async searchBooks(@Query() query: any) {
    return this.bookService.searchBooks(query);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }

  
}