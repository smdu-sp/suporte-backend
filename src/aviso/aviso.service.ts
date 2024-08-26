import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAvisoDto } from './dto/create-aviso.dto';
import { UpdateAvisoDto } from './dto/update-aviso.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Aviso } from './entities/aviso.entity';
import { AppService } from 'src/app.service';

@Injectable()
export class AvisoService {
  constructor(
    private prisma: PrismaService,
    private app: AppService
  ) {}

  async criar(createAvisoDto: CreateAvisoDto): Promise<Aviso> {
    createAvisoDto.status = true;
    const novo_aviso: Aviso = await this.prisma.aviso.create({ 
      data: createAvisoDto 
    });
    if (!novo_aviso) throw new ForbiddenException('Erro ao criar aviso.');
    return novo_aviso;
  }

  async buscarTudo(
    pagina: number = 1,
    limite: number = 10,
    status: string = 'all',
    busca?: string
  ): Promise<{ total: number, pagina: number, limite: number, data: Aviso[] }> {
    [pagina, limite] = this.app.verificaPagina(pagina, limite);
    const searchParams = {
      ...(busca ? 
        { OR: [
            { titulo: { contains: busca } },
            { mensagem: { contains: busca } }
        ] } : 
        {}),
      ...(status == 'all' ? {} : { status: status === 'true' }),
    };
    const total = await this.prisma.aviso.count({ where: searchParams });
    if (total == 0) return { total: 0, pagina: 0, limite: 0, data: [] };
    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);
    const avisos = await this.prisma.aviso.findMany({
      where: searchParams,
      skip: (pagina - 1) * limite,
      take: limite,
      include: { tipo: true }
    });
    return {
      total: +total,
      pagina: +pagina,
      limite: +limite,
      data: avisos
    };
  }

  async buscarPorId(id: string): Promise<Aviso> {
    const aviso: Aviso = await this.prisma.aviso.findUnique({
      where: { id: id }
    });
    if (!aviso) throw new ForbiddenException('Aviso não encontrado.');
    return aviso;
  }

  async atualizar(id: string, updateAvisoDto: UpdateAvisoDto): Promise<Aviso> {
    const aviso: Aviso = await this.prisma.aviso.findUnique({
      where: { id: id }
    });
    if (!aviso) throw new ForbiddenException('Aviso não encontrado.');
    const aviso_atualizado: Aviso = await this.prisma.aviso.update({
      where: { id: id },
      data: {
        titulo: updateAvisoDto.titulo,
        mensagem: updateAvisoDto.mensagem,
        cor: updateAvisoDto.cor,
        rota: updateAvisoDto.rota
      }
    });
    if (!aviso_atualizado) throw new ForbiddenException('Erro ao atualizar o aviso.');
    return aviso_atualizado;
  }

  async ativa(id: string): Promise<Aviso> {
    const aviso: Aviso = await this.prisma.aviso.findUnique({
      where: { id: id }
    });
    if (!aviso) throw new ForbiddenException('Aviso não encontrado.');
    const aviso_ativado: Aviso = await this.prisma.aviso.update({
      where: { id: id },
      data: { status: true }
    });
    if (!aviso_ativado) throw new ForbiddenException('Erro ao ativar aviso');
    return aviso_ativado;
  }

  async inativa(id: string): Promise<Aviso> {
    const aviso: Aviso = await this.prisma.aviso.findUnique({
      where: { id: id }
    });
    if (!aviso) throw new ForbiddenException('Aviso não encontrado.');
    const aviso_inativado: Aviso = await this.prisma.aviso.update({
      where: { id: id },
      data: { status: false }
    });
    if (!aviso_inativado) throw new ForbiddenException('Erro ao inativar aviso');
    return aviso_inativado;
  }

  async remover(id: string): Promise<Aviso> {
    const aviso = await this.prisma.aviso.findUnique({ 
      where: { id: id } 
    });
    if (!aviso) throw new ForbiddenException('Aviso não encontrado.');
    const removido = await this.prisma.aviso.delete({ 
      where: { id: id } 
    });
    if (!removido) throw new ForbiddenException('Não foi possível remover o aviso.');
    return removido;
  }
}

