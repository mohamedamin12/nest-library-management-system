import { Module } from '@nestjs/common';
import { CloudinaryConfigService } from './cloudinary.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryConfigService],
  exports: [CloudinaryConfigService], // Export the service for other modules
})
export class CloudinaryModule {}