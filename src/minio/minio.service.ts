import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as Minio from 'minio';
import { UploadedObjectInfo } from 'minio/dist/main/internal/type';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
  
  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'QTp44UIpWUt7Opr2ar3u',
      secretKey: 'hDWCC1E3mMKKtEha7So1A4Qi3BAvcraTTbKmUfxK',
    });
  }

  async uploadFile(
    bucketName: string, 
    fileName: string, 
    fileStream: Buffer
  ): Promise<string> {
    const nome = `profile-pic/${randomUUID()}.${fileName.split('.').pop()}`;
    const uploading: UploadedObjectInfo = await this.minioClient.putObject(bucketName, nome, fileStream);
    if (!uploading) throw new InternalServerErrorException();
    return this.minioClient.presignedGetObject(bucketName, nome);
  }

  async listFiles(bucketName: string): Promise<Minio.BucketItem[]> {
    const items: Minio.BucketItem[] = [];
    const stream = this.minioClient.listObjects(bucketName, 'profile-pic', true);
    return new Promise((resolve, reject) => {
      stream.on('data', (obj) => items.push(obj));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(items));
    });
  }
}
