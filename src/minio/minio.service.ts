import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as Minio from 'minio';
import { UploadedObjectInfo } from 'minio/dist/main/internal/type';
import { MinioService as minio } from 'nestjs-minio-client';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
  private minioService: minio;
  
  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'QTp44UIpWUt7Opr2ar3u',
      secretKey: 'hDWCC1E3mMKKtEha7So1A4Qi3BAvcraTTbKmUfxK',
    });
    this.minioService = new minio({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'QTp44UIpWUt7Opr2ar3u',
      secretKey: 'hDWCC1E3mMKKtEha7So1A4Qi3BAvcraTTbKmUfxK',
    });
  }

  async uploadFile(bucketName: string, fileName: string, fileStream: Buffer) {
    const nome = 'profile-pic/' + randomUUID() + '.' + fileName.split('.')[1];
    const uploading: UploadedObjectInfo = await this.minioClient.putObject(bucketName, nome, fileStream);
    if (!uploading) throw new InternalServerErrorException();
    const url = this.minioClient.presignedGetObject(bucketName, nome);
    return url;
  }

  async config(bucketName: string) {
    const objects = [];
    const stream = this.minioService.client.listObjects(bucketName, 'profile-pic', true);
    
    stream.on('data', (obj) => objects.push(obj));
    stream.on('error', (error) => {
      console.error('Error listing objects:', error);
      throw error;
    });

    await new Promise<void>((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    return objects;
  }

  async generateObjectUrl(bucketName: string, objectName: string) {
    const url = await this.minioService.client.presignedGetObject(bucketName, objectName);
    return url;
  }

  async listAllObjectsAndUrls(bucketName: string) {
    const objects = await this.config(bucketName);
    const urls = await Promise.all(
      objects.map(async (obj) => ({
        ...obj,
        url: await this.generateObjectUrl(bucketName, obj.name),
      }))
    );
    return urls;
  }

  // async buscarTodos(bucketName: string) {
  //   // const objects = await this.minioService(bucketName);
  //   // const urls = await Promise.all(
  //   //   objects.map(async (obj) => ({
  //   //     ...obj,
  //   //     url: await this.generateObjectUrl(bucketName, obj.name),
  //   //   }))
  //   // );
  //   // return objects;
  // }
}
