import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { Permissoes } from 'src/auth/decorators/permissoes.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('unidades')
@Controller('unidades')
export class UnidadesController {
  constructor(private readonly unidadesService: UnidadesService) {}

  @Permissoes('ADM')
  @Post('criar')
  criar(@Body() createUnidadeDto: CreateUnidadeDto) {
    return this.unidadesService.criar(createUnidadeDto);
  }

  @ApiQuery({ name: 'pagina', type: 'string', required: false })
  @ApiQuery({ name: 'limite', type: 'string', required: false })
  @ApiQuery({ name: 'status', type: 'string', required: false })
  @ApiQuery({ name: 'busca', type: 'string', required: false })
  @Permissoes('ADM')
  @Get('buscar-tudo')
  buscarTudo(
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('status') status?: string,
    @Query('busca') busca?: string,
  ) {
    return this.unidadesService.buscarTudo(+pagina, +limite, status, busca);
  }

  @Get('lista-completa')
  listaCompleta() {
    return this.unidadesService.listaCompleta();
  }

  @Permissoes('ADM')
  @Get('buscar-por-id/:id')
  buscarPorId(@Param('id') id: string) {
    return this.unidadesService.buscarPorId(id);
  }

  @Permissoes('ADM')
  @Patch('atualizar/:id')
  atualizar(@Param('id') id: string, @Body() updateUnidadeDto: CreateUnidadeDto) {
    return this.unidadesService.atualizar(id, updateUnidadeDto);
  }

  @Permissoes('ADM')
  @Delete('desativar/:id')
  desativar(@Param('id') id: string) {
    return this.unidadesService.desativar(id);
  }
}
