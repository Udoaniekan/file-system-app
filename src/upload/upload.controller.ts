import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, Get, Param, NotFoundException, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // Ensure this matches the form-data key
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file received. Please upload a valid file.');
    }

    try {
      return await this.uploadService.uploadFile(file);
    } catch (error) {
      throw new BadRequestException(`File upload failed: ${error.message}`);
    }
  }

  // ✅ Fetch File by ID
  @Get(':id')
  async getFile(@Param('id') fileId: string) {
    try {
      return await this.uploadService.getFileById(fileId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // ✅ Delete File by ID
  @Delete(':id')
  async deleteFile(@Param('id') fileId: string) {
    try {
      return await this.uploadService.deleteFile(fileId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
