import { Injectable } from '@nestjs/common';
import { CreateUsuarioTipoDto } from './dto/create-usuario_tipo.dto';
import { UpdateUsuarioTipoDto } from './dto/update-usuario_tipo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuarioTipoService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(createUsuarioTipoDto: CreateUsuarioTipoDto) {
    const novo_usuario_tipo = await this.prisma.usuario_Tipo.create({
      data: createUsuarioTipoDto
    });
    return novo_usuario_tipo;
  }

  findAll() {
    return `This action returns all usuarioTipo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioTipo`;
  }

  update(id: number, updateUsuarioTipoDto: UpdateUsuarioTipoDto) {
    return `This action updates a #${id} usuarioTipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioTipo`;
  }
}
