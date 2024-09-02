import { Global, Injectable, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as Minio from 'minio';
import { UploadedObjectInfo } from 'minio/dist/main/internal/type';
import * as sharp from 'sharp';

@Global()
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
 
  async uploadImage(file: any, folder: string = '', objectName?: string, bucketName: string = process.env.MINIO_BUCKETNAME): Promise<string> {
    objectName = `${folder}${objectName || randomUUID()}.webp`;
    console.log(objectName);
    const stream = await sharp(file.buffer).webp().toBuffer();
    if (!stream) throw new InternalServerErrorException();
    const uploading: UploadedObjectInfo = await this.minioClient.putObject(bucketName, objectName, stream);
    if (!uploading) throw new InternalServerErrorException();
    const url_imagem: string = await this.minioClient.presignedGetObject(bucketName, objectName);
    return url_imagem;
  }

  async deleteFile(objectName: string, bucketName: string = process.env.MINIO_BUCKETNAME) {
    return await this.minioClient.removeObject(bucketName, objectName);
  }

  async listFiles(bucketName: string) {
    const items: { url: string, nome: string }[] = [];
    const stream: Minio.BucketStream<Minio.BucketItem> = this.minioClient.listObjects(bucketName, 'profile-pic', true);
    // return new Promise((resolve, reject) => {
    //   stream.on('data', async (obj) => {
    //     try {
    //       const url: string = await this.minioClient.presignedGetObject(bucketName, obj.name);
    //       items.push({ url, nome: obj.name });
    //     } catch (err) {
    //       reject(err);
    //     }
    //   });
    //   stream.on('error', (err) => reject(err));
    //   stream.on('end', () => resolve(items));
    // });
  }
}
