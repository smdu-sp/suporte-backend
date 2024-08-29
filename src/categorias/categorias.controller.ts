import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post('criar')
  criar(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.criar(createCategoriaDto);
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
    return this.categoriasService.buscarTudo(+pagina, +limite, status, busca);
  }

  @Get('lista-completa')
  listaCompleta() {
    return this.categoriasService.listaCompleta();
  }
  
  @Get('buscar-por-tipo/:tipo_id')
  buscarPorTipo(@Param('tipo_id') tipo_id: string) {
    return this.categoriasService.buscarPorTipo(tipo_id);
  }
  
  @Get('buscar-por-id/:id')
  buscarPorId(@Param('id') id: string) {
    return this.categoriasService.buscarPorId(id);
  }

  @Patch('atualizar/:id')
  atualizar(@Param('id') id: string, @Body() updateCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.atualizar(id, updateCategoriaDto);
  }

  @Delete('desativar/:id')
  desativar(@Param('id') id: string) {
    return this.categoriasService.desativar(id);
  }
}
