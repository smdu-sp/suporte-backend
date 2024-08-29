import { Module } from '@nestjs/common';
import { UsuarioSistemaService } from './usuario_sistema.service';
import { UsuarioSistemaController } from './usuario_sistema.controller';

@Module({
  controllers: [UsuarioSistemaController],
  providers: [UsuarioSistemaService],
})
export class UsuarioSistemaModule {}
