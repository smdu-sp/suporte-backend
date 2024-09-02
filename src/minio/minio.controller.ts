import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
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
    const url = await this.minioService.uploadFile(file.originalname, file.buffer, process.env.MINIO_BUCKETNAME);
    return { url };
  }

  @Get('buscar-tudo')
  @IsPublic()
  async buscar() {
    const itens = this.minioService.listFiles(process.env.MINIO_BUCKETNAME);
    return itens
  }
}
