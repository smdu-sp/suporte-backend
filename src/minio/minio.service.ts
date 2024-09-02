import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as Minio from 'minio';
import { UploadedObjectInfo } from 'minio/dist/main/internal/type';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
 
  constructor() {
    const config = {
      endPoint: process.env.ENDPOINT,
      port: parseInt(process.env.PORT),
      useSSL: false,
      accessKey: process.env.ACCESSKEY,
      secretKey: process.env.SECRETKEY,
    }
  }
 
  async uploadFile(bucketName: string, fileName: string, fileStream: Buffer) {
    const nome = 'profile-pic/' + randomUUID() + '.' + fileName.split('.')[1];
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
