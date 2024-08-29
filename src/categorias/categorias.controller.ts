import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Permissoes } from 'src/auth/decorators/permissoes.decorator';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post('criar')
  criar(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.criar(createCategoriaDto);
  }

  @Get('buscar-tudo')
  buscarTudo(
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('status') status?: string,
    @Query('busca') busca?: string
  ) {
    return this.categoriasService.buscarTudo(+pagina, +limite, status, busca);
  }

  
  @Get('lista-completa')
  listaCompleta() {
    return this.categoriasService.listaCompleta();
  }
  
  @Get('buscar-por-sistema/:sistema_id')
  buscarPorSistema(@Param('sistema_id') sistema_id: string) {
    return this.categoriasService.buscarPorSistema(sistema_id);
  }
  
  @Get('buscar-por-id/:id')
  buscarPorId(@Param('id') id: string) {
    return this.categoriasService.buscarPorId(id);
  }

  @Patch('atualizar/:id')
  atualizar(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.atualizar(id, updateCategoriaDto);
  }

  @Delete('desativar/:id')
  desativar(@Param('id') id: string) {
    return this.categoriasService.desativar(id);
  }
}
