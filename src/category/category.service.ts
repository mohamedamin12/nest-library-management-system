import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { privateDecrypt } from 'crypto';
import { Model } from 'mongoose';
import { CreateBookDto } from 'src/book/dto/create-book.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CreateCategoryDto>,
    @InjectModel('Book')
    private readonly bookModel: Model<CreateBookDto>,
  ) {}

  async create(createAuthorDto: any): Promise<CreateCategoryDto> {
    const newAuthor = new this.categoryModel(createAuthorDto);
    return newAuthor.save();
  }

  async findAll(): Promise<CreateCategoryDto[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<CreateCategoryDto | null> {
    return this.categoryModel.findById(id).exec();
  }
  async findBooksFromCategory(id: string): Promise<any> {
    if (await this.categoryModel.findById(id)) {
      const books = await this.bookModel.find({ category_id: id });
      return books;
    } else {
      throw new NotFoundException('invalid ID category ');
    }
  }

  async update(id: string, updateCategoryDto: any): Promise<CreateCategoryDto | null> {
    return this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }

  async uploadImage(
    image: string,
    categoryId: string,
  ): Promise<any> {
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(categoryId, {image}, { new: true });
    return updatedCategory;
  }
}
