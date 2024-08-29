import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubcategoriasService } from './subcategorias.service';
import { CreateSubcategoriaDto } from './dto/create-subcategoria.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('subcategorias')
@Controller('subcategorias')
export class SubcategoriasController {
  constructor(private readonly subcategoriasService: SubcategoriasService) {}

  @Post('criar')
  criar(@Body() createSubcategoriaDto: CreateSubcategoriaDto) {
    return this.subcategoriasService.criar(createSubcategoriaDto);
  }

  @ApiQuery({ name: 'pagina', type: 'string', required: false })
  @ApiQuery({ name: 'limite', type: 'string', required: false })
  @ApiQuery({ name: 'status', type: 'string', required: false })
  @ApiQuery({ name: 'busca', type: 'string', required: false })
  @Get('buscar-tudo')
  buscarTudo(
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('status') status?: string,
    @Query('busca') busca?: string
  ) {
    return this.subcategoriasService.buscarTudo(+pagina, +limite, status, busca);
  }
  
  @Get('lista-completa')
  listaCompleta() {
    return this.subcategoriasService.listaCompleta();
  }
  
  @Get('buscar-por-categoria/:categoria_id')
  buscarPorCategoria(@Param('categoria_id') categoria_id: string) {
    return this.subcategoriasService.buscarPorCategoria(categoria_id);
  }
  
  @Get('buscar-por-id/:id')
  buscarPorId(@Param('id') id: string) {
    return this.subcategoriasService.buscarPorId(id);
  }

  @Patch('atualizar/:id')
  atualizar(@Param('id') id: string, @Body() updateSubcategoriaDto: CreateSubcategoriaDto) {
    return this.subcategoriasService.atualizar(id, updateSubcategoriaDto);
  }

  @Delete('desativar/:id')
  desativar(@Param('id') id: string) {
    return this.subcategoriasService.desativar(id);
  }
}
