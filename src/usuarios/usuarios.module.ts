import { Global, Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { AvatarGateway } from './sockets/avatar.gateway';
@Global()
@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, AvatarGateway],
  exports: [UsuariosService],
})
export class UsuariosModule {}
