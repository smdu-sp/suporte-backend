import { Injectable } from '@nestjs/common';
import { CreateUsuarioTipoDto } from './dto/create-usuario_tipo.dto';
import { UpdateUsuarioTipoDto } from './dto/update-usuario_tipo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuarioTipoService {
  constructor(
    private readonly prisma: PrismaService  
  ) {}

  async criar(createUsuarioTipoDto: CreateUsuarioTipoDto, token: string) {
    const novo_usuario_tipo = await this.prisma.usuario_Sistema.create({
      data: createUsuarioTipoDto
    });
    return novo_usuario_tipo;
  }

  async buscarTudo() {
    return await this.prisma.usuario_Sistema.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} usuarioTipo`;
  // }

  // update(id: number, updateUsuarioTipoDto: UpdateUsuarioTipoDto) {
  //   return `This action updates a #${id} usuarioTipo`;
  // }

  // async remove(id: string) {
  //   return await this.prisma.usuario_Tipo.delete({
  //     where: { id: id }
  //   });
  // }
}
