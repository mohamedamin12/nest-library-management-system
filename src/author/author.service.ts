import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel('Author') private readonly authorModel: Model<CreateAuthorDto>,
  ) {}

  async create(createAuthorDto: any): Promise<CreateAuthorDto> {
    const newAuthor = new this.authorModel(createAuthorDto);
    return newAuthor.save();
  }

  async findAll(): Promise<CreateAuthorDto[]> {
    return this.authorModel.find().exec();
  }

  async findOne(id: string): Promise<CreateAuthorDto | null> {
    return this.authorModel.findById(id).exec();
  }

  async update(id: string, updateAuthorDto: any): Promise<CreateAuthorDto | null> {
    return this.authorModel
      .findByIdAndUpdate(id, updateAuthorDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.authorModel.findByIdAndDelete(id).exec();
  }
}
