import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SistemasService } from './sistemas.service';
import { CreateSistemaDto } from './dto/create-sistema.dto';
import { UpdateSistemaDto } from './dto/update-sistema.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('sistemas')
export class SistemasController {
  constructor(private readonly sistemasService: SistemasService) {}

  @Post('criar')
  criar(@Body() createSistemaDto: CreateSistemaDto) {
    return this.sistemasService.criar(createSistemaDto);
  }
  
  @Get('buscar-tudo')
  buscarTudo(
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('status') status?: string,
    @Query('busca') busca?: string
  ) {
    return this.sistemasService.buscarTudo(+pagina, +limite, status, busca);
  }

  @Get('lista-completa')
  listaCompleta() {
    return this.sistemasService.listaCompleta();
  }
  
  @Get('buscar-por-id/:id')
  buscarPorId(@Param('id') id: string) {
    return this.sistemasService.buscarPorId(id);
  }

  @Patch('atualizar/:id')
  atualizar(@Param('id') id: string, @Body() updateSistemaDto: UpdateSistemaDto) {
    return this.sistemasService.atualizar(id, updateSistemaDto);
  }

  @Delete('desativar/:id')
  desativar(@Param('id') id: string) {
    return this.sistemasService.desativar(id);
  }

  @IsPublic()
  @Get('motivo/:id')
  buscaSistemas(@Param('id') id: string) {
    return this.sistemasService.buscaSistemas(id);
  }
}
