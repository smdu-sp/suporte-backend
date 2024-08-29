import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSubcategoriaDto } from './dto/create-subcategoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppService } from 'src/app.service';

@Injectable()
export class SubcategoriasService {
  constructor(
    private prisma: PrismaService,
    private app: AppService
  ) {}

  async listaCompleta() {
    const lista = await this.prisma.subcategoria.findMany({
      orderBy: { nome: 'asc' }
    });
    if (!lista || lista.length == 0) throw new ForbiddenException('Nenhuma subcategoria encontrado.');
    return lista;
  }

  async buscaPorNome(nome: string) {
    const subcategoria = await this.prisma.subcategoria.findFirst({
      where: { nome }
    });
    return subcategoria;
  }

  async criar(createSubcategoriaDto: CreateSubcategoriaDto) {
    const { nome } = createSubcategoriaDto;
    if (await this.buscaPorNome(nome)) throw new ForbiddenException('Ja existe uma subcategoria com o mesmo nome.');
    const novaSubcategoria = await this.prisma.subcategoria.create({
      data: createSubcategoriaDto
    });
    if (!novaSubcategoria) throw new InternalServerErrorException('Não foi possível criar a subcategoria. Tente novamente.');
    return novaSubcategoria;
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
            { categoria: { nome: { contains: busca } } }
        ] } : 
        {}),
      ...(status == 'all' ? {} : { status: status === 'true' }),
    };
    const total = await this.prisma.subcategoria.count({ where: searchParams });
    if (total == 0) return { total: 0, pagina: 0, limite: 0, users: [] };
    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);
    const subcategorias = await this.prisma.subcategoria.findMany({
      where: searchParams,
      include: {
        categoria: true
      },
      orderBy: { nome: 'asc' },
      skip: (pagina - 1) * limite,
      take: limite,
    });
    return {
      total: +total,
      pagina: +pagina,
      limite: +limite,
      data: subcategorias
    };
  }

  async buscarPorId(id: string) {
    const subcategoria = await this.prisma.subcategoria.findUnique({ where: { id } });
    if (!subcategoria) throw new ForbiddenException('Subcategoria não encontrada.');
    return subcategoria;
  }

  async buscarPorCategoria(categoria_id: string) {
    const subcategorias = await this.prisma.subcategoria.findMany({ where: { categoria_id } });
    if (!subcategorias) throw new ForbiddenException('Nenhuma subcategoria encontrada.');
    return subcategorias;
  }

  async atualizar(id: string, updateSubcategoriaDto: CreateSubcategoriaDto) {
    const { nome } = updateSubcategoriaDto;
    const subcategoria = await this.prisma.subcategoria.findUnique({ where: { id } });
    if (!subcategoria) throw new ForbiddenException('Subcategoria não encontrada.');
    if (nome) {
      const subcategoriaNome = await this.buscaPorNome(nome);
      if (subcategoriaNome && subcategoriaNome.id != id) throw new ForbiddenException('Já existe uma subcategoria com o mesmo nome.');
    }
    const updatedSubcategoria  = await this.prisma.subcategoria.update({
      where: { id },
      data: updateSubcategoriaDto
    });
    if (!updatedSubcategoria) throw new InternalServerErrorException('Não foi possível atualizar a subcategoria. Tente novamente.');
    return updatedSubcategoria;
  }

  async desativar(id: string) {
    const subcategoria = await this.prisma.subcategoria.findUnique({ where: { id } });
    if (!subcategoria) throw new ForbiddenException('Subcategoria não encontrada.');
    const updatedSubcategoria = await this.prisma.subcategoria.update({
      where: { id },
      data: { status: false }
    });
    if (!updatedSubcategoria) throw new InternalServerErrorException('Não foi possível desativar a subcategoria. Tente novamente.');
    return {
      message: 'Categoria desativada com sucesso.'
    }
  }
}
