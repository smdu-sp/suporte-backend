import { Module } from '@nestjs/common';
import { UsuarioTipoService } from './usuario_tipo.service';
import { UsuarioTipoController } from './usuario_tipo.controller';

@Module({
  controllers: [UsuarioTipoController],
  providers: [UsuarioTipoService],
})
export class UsuarioTipoModule {}
