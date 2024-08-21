import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
    return await this.prisma.aviso.create({ data: createAvisoDto });
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
            { titulo: { contains: busca } },
            { mensagem: { contains: busca } }
        ] } : 
        {}),
      ...(status == 'all' ? {} : { status: status === 'true' }),
    };
    const total = await this.prisma.aviso.count({ where: searchParams });
    if (total == 0) return { total: 0, pagina: 0, limite: 0, users: [] };
    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);
    const avisos = await this.prisma.aviso.findMany({
      include: { tipo: true },
      where: searchParams,
      skip: (pagina - 1) * limite,
      take: limite,
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
    return await this.prisma.aviso.update({
      where: { id: id },
      data: updateAvisoDto
    });
  }

  async ativa(id: string): Promise<Aviso> {
    const aviso: Aviso = await this.prisma.aviso.findUnique({
      where: { id: id }
    });
    if (!aviso) throw new ForbiddenException('Aviso não encontrado.');
    return  await this.prisma.aviso.update({
      where: { id: id },
      data: { status: true }
    });
  }

  async inativa(id: string): Promise<Aviso> {
    const aviso: Aviso = await this.prisma.aviso.findUnique({
      where: { id: id }
    });
    if (!aviso) throw new ForbiddenException('Aviso não encontrado.');
    return await this.prisma.aviso.update({
      where: { id: id },
      data: { status: false }
    });
  }

  async remover(id: string): Promise<Aviso> {
    const aviso = await this.prisma.aviso.findUnique({ 
      where: { id: id } 
    });
    if (!aviso) throw new ForbiddenException('Aviso não encontrado.');
    const removido = await this.prisma.aviso.delete({ 
      where: { id: id } 
    });
    if (!removido) throw new InternalServerErrorException('Não foi possível remover o aviso. Tente novamente.');
    return removido;
  }
}

