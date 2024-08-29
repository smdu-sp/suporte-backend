
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuarioSistemaService } from './usuario_sistema.service';
import { CreateUsuarioSistemaDto } from './dto/create-usuario_sistema.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Usuario, UsuarioSistema } from '@prisma/client';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';

@Controller('usuario-sistema')
export class UsuarioSistemaController {
  constructor(private readonly usuarioSistemaService: UsuarioSistemaService) {}

  @IsPublic()
  @Post()
  async criar(
    @Body() createUsuarioSistemaDto: CreateUsuarioSistemaDto,
    @UsuarioAtual() usuario: Usuario
  ): Promise<UsuarioSistema> {
    const novo_usuario_sistema = await this.usuarioSistemaService.criar(createUsuarioSistemaDto, usuario);
    if (!novo_usuario_sistema) return
    return novo_usuario_sistema;
  }

  @Get()
  async buscarTudo(): Promise<UsuarioSistema[]> {
    const usuario_sistema_array = await this.usuarioSistemaService.buscarTudo();
    if (!usuario_sistema_array) return
    return usuario_sistema_array;
  }
}
