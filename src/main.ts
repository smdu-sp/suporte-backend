import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swagger_config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Suporte Backend')
    .setDescription('Documentação do backend da aplicação interna de suporte.')
    .setVersion('1.0')
    .build();
  const swagger_document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('swagger/api', app, swagger_document);
  await app.listen(3000);
}
bootstrap();
