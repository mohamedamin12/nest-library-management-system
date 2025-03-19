import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';

@Module({
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
