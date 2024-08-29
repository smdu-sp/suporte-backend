import { Injectable } from '@nestjs/common';
import { CreateUsuarioSistemaDto } from './dto/create-usuario_sistema.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Usuario } from '@prisma/client';

@Injectable()
export class UsuarioSistemaService {
  constructor(
    private readonly prisma: PrismaService  
  ) {}

  async criar(createUsuarioSistemaDto: CreateUsuarioSistemaDto, usuario: Usuario) {
    const novo_usuario_sistema = await this.prisma.usuarioSistema.create({
      data: createUsuarioSistemaDto
    });
    return novo_usuario_sistema;
  }

  async buscarTudo() {
    return await this.prisma.usuarioSistema.findMany();
  }
}
