import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; // ✅ Import ConfigModule
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadSchema } from './file.schema';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule, // ✅ Add this to make ConfigService available
    MongooseModule.forFeature([{ name: 'Upload', schema: UploadSchema }]), // Register schema

    CloudinaryModule,
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
