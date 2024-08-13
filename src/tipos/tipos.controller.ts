import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TiposService } from './tipos.service';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { Permissoes } from 'src/auth/decorators/permissoes.decorator';

@Controller('tipos')
export class TiposController {
  constructor(private readonly tiposService: TiposService) {}

  @Post('criar')
  criar(@Body() createTipoDto: CreateTipoDto) {
    return this.tiposService.criar(createTipoDto);
  }

  @Get('buscar-tudo')
  buscarTudo(
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('status') status?: string,
    @Query('busca') busca?: string
  ) {
    return this.tiposService.buscarTudo(+pagina, +limite, status, busca);
  }

  @Permissoes('ADM', 'TEC', 'USR')
  @Get('lista-completa')
  listaCompleta() {
    return this.tiposService.listaCompleta();
  }
  
  @Get('buscar-por-id/:id')
  buscarPorId(@Param('id') id: string) {
    return this.tiposService.buscarPorId(id);
  }

  @Patch('atualizar/:id')
  atualizar(@Param('id') id: string, @Body() updateTipoDto: UpdateTipoDto) {
    return this.tiposService.atualizar(id, updateTipoDto);
  }

  @Delete('desativar/:id')
  desativar(@Param('id') id: string) {
    return this.tiposService.desativar(id);
  }
}
