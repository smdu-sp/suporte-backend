import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as Minio from 'minio';
import { UploadedObjectInfo } from 'minio/dist/main/internal/type';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
 
  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: parseInt(process.env.MINIO_PORT),
      useSSL: false,
      accessKey: process.env.MINIO_ACCESSKEY,
      secretKey: process.env.MINIO_SECRETKEY,
    })
  }
 
  async uploadFile(
    fileName: string, 
    fileStream: Buffer, 
    bucketName: string = process.env.MINIO_BUCKETNAME
  ): Promise<string> {
    const nome_imagem: string = `profile-pic/${randomUUID()}.${fileName.split('.').pop()}`;
    const uploading: UploadedObjectInfo = await this.minioClient.putObject(bucketName, nome_imagem, fileStream);
    if (!uploading) throw new InternalServerErrorException();
    const url_imagem: string = await this.minioClient.presignedGetObject(bucketName, nome_imagem);
    return url_imagem;
  }

  async listFiles(bucketName: string): Promise<{ url: string, nome: string }[]> {
    const items: { url: string, nome: string }[] = [];
    const stream: Minio.BucketStream<Minio.BucketItem> = this.minioClient.listObjects(bucketName, 'profile-pic', true);
    return new Promise((resolve, reject) => {
      stream.on('data', async (obj) => {
        try {
          const url: string = await this.minioClient.presignedGetObject(bucketName, obj.name);
          items.push({ url, nome: obj.name });
        } catch (err) {
          reject(err);
        }
      });
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(items));
    });
  }
}
