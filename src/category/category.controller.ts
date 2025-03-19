import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,

} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { RolesEnum } from 'src/user/enum/roles';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Multer } from 'multer'; 
import { extname, join } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { CloudinaryConfigService } from 'src/cloudinary/cloudinary.config';



export const storage = diskStorage({
  destination: '../../uploads/category-images', // Destination folder
  filename: (req, file, callback) => {
    // Generate a unique filename
    const uniqueName = `${Date.now()}${extname(file.originalname)}`;
    callback(null, uniqueName);
  },
});

@ApiBearerAuth('access_token')
@ApiTags('categories')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly cloudinaryService: CloudinaryConfigService,
  ) {}
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get details of a books' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a category by ID' })
  @ApiParam({ name: 'id', description: 'ID of the category' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }
  @Get(':id/books')
  @ApiOperation({ summary: 'Get details of Books from category by ID' })
  @ApiParam({ name: 'id', description: 'ID of the category' })
  findBooksFromCategory(@Param('id') id: string) {
    return this.categoryService.findBooksFromCategory(id);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'update details of a category by ID' })
  @ApiParam({ name: 'id', description: 'ID of the category' })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'delete category by ID' })
  @ApiParam({ name: 'id', description: 'ID of the category' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('image',{storage}))
  async uploadCategoryImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    console.log(id);
    
    console.log(file.path);
    
    const result = await this.cloudinaryService.uploadImage(file.path);
    return this.categoryService.uploadImage(result.secure_url, id);
  }
}

