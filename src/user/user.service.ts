import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<CreateUserDto>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return await newUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(username: string, req?): Promise<CreateUserDto | undefined> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${username} not found.`);
    }
    return user;
  }
  async findById(id: string): Promise<CreateUserDto | undefined> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, req) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    if (
      (await this.authService.thisIsMe(req.user, user)) ||
      (await this.authService.thisIsAdmin(req.user))
    ) {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
      return user;
    } else {
      throw new UnauthorizedException(
        'You are not authorized to update this user.',
      );
    }
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
