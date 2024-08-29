import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppService } from 'src/app.service';

@Injectable()
export class CategoriasService {
  constructor(
    private prisma: PrismaService,
    private app: AppService
  ) {}

  async listaCompleta() {
    const lista = await this.prisma.categoria.findMany({
      orderBy: { nome: 'asc' }
    });
    if (!lista || lista.length == 0) throw new ForbiddenException('Nenhuma categoria encontrado.');
    return lista;
  }

  async buscaPorNome(nome: string) {
    const categoria = await this.prisma.categoria.findFirst({
      where: { nome }
    });
    return categoria;
  }

  async criar(createCategoriaDto: CreateCategoriaDto) {
    const { nome } = createCategoriaDto;
    if (await this.buscaPorNome(nome)) throw new ForbiddenException('Ja existe uma categoria com o mesmo nome');
    const novaCategoria = await this.prisma.categoria.create({
      data: createCategoriaDto
    });
    if (!novaCategoria) throw new InternalServerErrorException('Não foi possível criar a categoria. Tente novamente.');
    return novaCategoria;
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
            { sistema: { nome: { contains: busca } } },
        ] } : 
        {}),
      ...(status == 'all' ? {} : { status: status === 'true' }),
    };
    const total = await this.prisma.categoria.count({ where: searchParams });
    if (total == 0) return { total: 0, pagina: 0, limite: 0, users: [] };
    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);
    const categorias = await this.prisma.categoria.findMany({
      where: searchParams,
      include: {
        sistema: true
        sistema: true
      },
      orderBy: { nome: 'asc' },
      skip: (pagina - 1) * limite,
      take: limite,
    });
    return {
      total: +total,
      pagina: +pagina,
      limite: +limite,
      data: categorias
    };
  }

  async buscarPorId(id: string) {
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });
    if (!categoria) throw new ForbiddenException('Categoria não encontrada.');
    return categoria;
  }

  async buscarPorSistema(sistema_id: string) {
    const categorias = await this.prisma.categoria.findMany({ where: { sistema_id } });
    if (!categorias) throw new ForbiddenException('Nenhuma categoria encontrada.');
    return categorias;
  }

  async atualizar(id: string, updateCategoriaDto: CreateCategoriaDto) {
    const { nome } = updateCategoriaDto;
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });
    if (!categoria) throw new ForbiddenException('Categoria não encontrado.');
    if (nome) {
      const categoriaNome = await this.buscaPorNome(nome);
      if (categoriaNome && categoriaNome.id != id) throw new ForbiddenException('Já existe uma categoria com o mesmo nome.');
    }
    const updatedCategoria = await this.prisma.categoria.update({
      where: { id },
      data: updateCategoriaDto
    });
    if (!updatedCategoria) throw new InternalServerErrorException('Não foi possível atualizar a categoria. Tente novamente.');
    return updatedCategoria;
  }

  async desativar(id: string) {
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });
    if (!categoria) throw new ForbiddenException('Categoria não encontrada.');
    const updatedCategoria = await this.prisma.categoria.update({
      where: { id },
      data: { status: false }
    });
    if (!updatedCategoria) throw new InternalServerErrorException('Não foi possível desativar a categoria. Tente novamente.');
    return {
      message: 'categoria desativado com sucesso.'
    }
  }
}
