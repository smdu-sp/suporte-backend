import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSistemaDto } from './dto/create-sistema.dto';
import { UpdateSistemaDto } from './dto/update-sistema.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppService } from 'src/app.service';

@Injectable()
export class SistemasService {
  constructor(
    private prisma: PrismaService,
    private app: AppService
  ) {}

  async listaCompleta() {
    const lista = await this.prisma.sistema.findMany({
      orderBy: { nome: 'asc' }
    });
    if (!lista || lista.length == 0) throw new ForbiddenException('Nenhum sistema encontrado.');
    return lista;
  }

  async listaIds() {
    const lista = await this.prisma.sistema.findMany({
      select: {
        id: true
      }
    });
    if (!lista || lista.length == 0) throw new ForbiddenException('Nenhum sistema encontrado.');
    return lista;
  }

  async buscaPorNome(nome: string) {
    const sistema = await this.prisma.sistema.findFirst({
      where: { nome }
    });
    return sistema;
  }

  async criar(createSistemaDto: CreateSistemaDto) {
    const { nome, padrao, status } = createSistemaDto;
    if (await this.buscaPorNome(nome)) throw new ForbiddenException('Ja existe um sistema com o mesmo nome');
    const novoSistema = await this.prisma.sistema.create({
      data: createSistemaDto
    });
    if (!novoSistema) throw new InternalServerErrorException('Não foi possível criar o sistema. Tente novamente.');
    return novoSistema;
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
    const total = await this.prisma.sistema.count({ where: searchParams });
    if (total == 0) return { total: 0, pagina: 0, limite: 0, users: [] };
    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);
    const sistemas = await this.prisma.sistema.findMany({
      where: searchParams,
      orderBy: { nome: 'asc' },
      skip: (pagina - 1) * limite,
      take: limite,
    });
    return {
      total: +total,
      pagina: +pagina,
      limite: +limite,
      data: sistemas
    };
  }

  async buscarPorId(id: string) {
    const sistema = await this.prisma.sistema.findUnique({ where: { id } });
    if (!sistema) throw new ForbiddenException('Sistema não encontrada.');
    return sistema;
  }

  async atualizar(id: string, updateSistemaDto: UpdateSistemaDto) {
    const { nome, padrao, status } = updateSistemaDto;
    const sistema = await this.prisma.sistema.findUnique({ where: { id } });
    if (!sistema) throw new ForbiddenException('Sistema não encontrado.');
    if (nome) {
      const sistemaNome = await this.buscaPorNome(nome);
      if (sistemaNome && sistemaNome.id != id) throw new ForbiddenException('Já existe um sistema com o mesmo nome.');
    }
    const updatedSistema = await this.prisma.sistema.update({
      where: { id },
      data: updateSistemaDto
    });
    if (!updatedSistema) throw new InternalServerErrorException('Não foi possível atualizar o sistema. Tente novamente.');
    return updatedSistema;
  }

  async desativar(id: string) {
    const sistema = await this.prisma.sistema.findUnique({ where: { id } });
    if (!sistema) throw new ForbiddenException('Sistema não encontrado.');
    const updatedSistema = await this.prisma.sistema.update({
      where: { id },
      data: { status: false }
    });
    if (!updatedSistema) throw new InternalServerErrorException('Não foi possível desativar o sistema. Tente novamente.');
    return {
      message: 'Sistema desativado com sucesso.'
    }
  }

  async buscaSistemas(id: string) {
    const busca = await this.prisma.subcategoria.findUnique({ where: { id },
      select: {
        id: true,
        nome: true,
        categoria: {
          select: {
            id: true,
            nome: true,
            sistema: {
              select: {
                id: true,
                nome: true
              }
            }
          }
        }
      }
    })
    if (!busca) throw new ForbiddenException('Não foi possivel encontarar o sistema. Tente novamente.');  
    return busca;
  }
}
