import { Module } from '@nestjs/common';
import { UsuarioTipoService } from './usuario_tipo.service';
import { UsuarioTipoController } from './usuario_tipo.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsuarioTipoController],
  providers: [UsuarioTipoService, AuthService, JwtService],
})
export class UsuarioTipoModule {}
