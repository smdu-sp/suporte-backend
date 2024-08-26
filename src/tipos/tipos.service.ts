import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppService } from 'src/app.service';

@Injectable()
export class TiposService {
  constructor(
    private prisma: PrismaService,
    private app: AppService
  ) {}

  async listaCompleta() {
    const lista = await this.prisma.tipo.findMany({
      orderBy: { nome: 'asc' }
    });
    if (!lista || lista.length == 0) throw new ForbiddenException('Nenhum tipo encontrado.');
    return lista;
  }

  async listaIds() {
    const lista = await this.prisma.tipo.findMany({
      select: {
        id: true
      }
    });
    if (!lista || lista.length == 0) throw new ForbiddenException('Nenhum tipo encontrado.');
    return lista;
  }

  async buscaPorNome(nome: string) {
    const tipo = await this.prisma.tipo.findFirst({
      where: { nome }
    });
    return tipo;
  }

  async criar(createTipoDto: CreateTipoDto) {
    const { nome, status } = createTipoDto;
    if (await this.buscaPorNome(nome)) throw new ForbiddenException('Ja existe um tipo com o mesmo nome');
    const novoTipo = await this.prisma.tipo.create({
      data: createTipoDto
    });
    if (!novoTipo) throw new InternalServerErrorException('Não foi possível criar o tipo. Tente novamente.');
    return novoTipo;
  }

  async buscarTudo(
    pagina: number = 1,
    limite: number = 10,
    status: string = 'all',
    busca?: string
  ) {
    [pagina, limite] = this.app.verificaPagina(pagina, limite);
    const searchParams = {
      ...(busca ? 
        { OR: [
            { nome: { contains: busca } },
        ] } : 
        {}),
      ...(status == 'all' ? {} : { status: status === 'true' }),
    };
    const total = await this.prisma.tipo.count({ where: searchParams });
    if (total == 0) return { total: 0, pagina: 0, limite: 0, users: [] };
    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);
    const tipos = await this.prisma.tipo.findMany({
      where: searchParams,
      orderBy: { nome: 'asc' },
      skip: (pagina - 1) * limite,
      take: limite,
    });
    return {
      total: +total,
      pagina: +pagina,
      limite: +limite,
      data: tipos
    };
  }

  async buscarPorId(id: string) {
    const tipo = await this.prisma.tipo.findUnique({ where: { id } });
    if (!tipo) throw new ForbiddenException('tipo não encontrada.');
    return tipo;
  }

  async atualizar(id: string, updateTipoDto: UpdateTipoDto) {
    const { nome, status } = updateTipoDto;
    const tipo = await this.prisma.tipo.findUnique({ where: { id } });
    if (!tipo) throw new ForbiddenException('Tipo não encontrado.');
    if (nome) {
      const tipoNome = await this.buscaPorNome(nome);
      if (tipoNome && tipoNome.id != id) throw new ForbiddenException('Já existe um tipo com o mesmo nome.');
    }
    const updatedTipo = await this.prisma.tipo.update({
      where: { id },
      data: updateTipoDto
    });
    if (!updatedTipo) throw new InternalServerErrorException('Não foi possível atualizar o tipo. Tente novamente.');
    return updatedTipo;
  }

  async desativar(id: string) {
    const tipo = await this.prisma.tipo.findUnique({ where: { id } });
    if (!tipo) throw new ForbiddenException('Tipo não encontrado.');
    const updatedTipo = await this.prisma.tipo.update({
      where: { id },
      data: { status: false }
    });
    if (!updatedTipo) throw new InternalServerErrorException('Não foi possível desativar o tipo. Tente novamente.');
    return {
      message: 'Tipo desativado com sucesso.'
    }
  }

  async buscaTipos(id: string) {
    const busca = await this.prisma.subcategoria.findUnique({ where: { id },
      select: {
        id: true,
        nome: true,
        categoria: {
          select: {
            id: true,
            nome: true,
            tipo: {
              select: {
                id: true,
                nome: true
              }
            }
          }
        }
      }
    })
    if (!busca) throw new ForbiddenException('Não foi possivel encontarar o tipo')  
    return busca;
  }
}
