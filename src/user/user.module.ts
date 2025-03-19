import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[MongooseModule.forFeature([{name:'User',schema:UserSchema}]),
  forwardRef(() => AuthModule),
],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
