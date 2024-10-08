import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Global } from '@nestjs/common';
import { OrdensService } from './ordens.service';
import { CreateOrdemDto } from './dto/create-ordem.dto';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';
import { Usuario } from '@prisma/client';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@Global()
@ApiBearerAuth()
@ApiTags('ordens')
@Controller('ordens')
export class OrdensController {
  constructor(private readonly ordensService: OrdensService) {}

  @Post('criar')
  criar(
    @Body() createOrdenDto: CreateOrdemDto, 
    @UsuarioAtual() usuario: Usuario
  ) {
    return this.ordensService.criar(createOrdenDto, usuario);
  }

  @ApiQuery({ name: 'pagina', type: 'string', required: false })
  @ApiQuery({ name: 'limite', type: 'string', required: false })
  @ApiQuery({ name: 'status', type: 'string', required: false })
  @ApiQuery({ name: 'busca', type: 'string', required: false })
  @ApiQuery({ name: 'unidade_id', type: 'string', required: false })
  @ApiQuery({ name: 'solicitante_id', type: 'string', required: false })
  @ApiQuery({ name: 'andar', type: 'string', required: false })
  @ApiQuery({ name: 'sala', type: 'string', required: false })
  @Get('buscar-tudo')
  buscarTudo(
    @UsuarioAtual() usuario: Usuario,
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('status') status?: string,
    @Query('unidade_id') unidade_id?: string,
    @Query('solicitante_id') solicitante_id?: string,
    @Query('andar') andar?: string,
    @Query('sala') sala?: string,
  ) {
    return this.ordensService.buscarTudo(usuario, +pagina, +limite, +status, unidade_id, solicitante_id, +andar, sala);
  }

  @Get('buscar-por-id/:id')
  buscarPorId(@Param('id') id: string) {
    return this.ordensService.buscarPorId(id);
  }

  @Patch('atualizar/:id')
  atualizar(@Param('id') id: string, @Body() updateOrdemDto: CreateOrdemDto) {
    return this.ordensService.atualizar(id, updateOrdemDto);
  }

  @Get('painel')
  retornaPainel(@UsuarioAtual() usuario: Usuario) {
    return this.ordensService.retornaPainel(usuario);
  }

  // @Delete('desativar/:id')
  // desativar(@Param('id') id: string) {
  //   return this.ordensService.desativar(id);
  // }
}
