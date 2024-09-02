import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MinioService } from './minio.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @IsPublic()
  async create(@UploadedFile() file) {
    return await this.minioService.uploadImage(file, 'suporte-smul');
  }

  @Get('buscar-tudo')
  @IsPublic()
  async buscar() {
    return this.minioService.listFiles('suporte-smul');
  }
}
