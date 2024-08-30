import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { SistemasService } from './sistemas.service';
import { CreateSistemaDto } from './dto/create-sistema.dto';
import { UpdateSistemaDto } from './dto/update-sistema.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BuscaTudoResponseDTO } from './dto/busca-tudo-response.dto';
import { strict } from 'assert';

@ApiBearerAuth()
@ApiTags('sistemas')
@Controller('sistemas')
export class SistemasController {
  constructor(
    private readonly sistemasService: SistemasService
  ) {}

  @Post('criar')
  @ApiResponse({
    description: 'Criando um novo sistema.',
    status: HttpStatus.CREATED,
    type: CreateSistemaDto
  })
  criar(@Body() createSistemaDto: CreateSistemaDto) {
    return this.sistemasService.criar(createSistemaDto);
  }
  
  @Get('buscar-tudo')
  @ApiQuery({ name: 'pagina', type: 'string', required: false })
  @ApiQuery({ name: 'limite', type: 'string', required: false })
  @ApiQuery({ name: 'status', type: 'string', required: false })
  @ApiQuery({ name: 'busca', type: 'string', required: false })
  @ApiResponse({
    description: 'Buscando todos os sistemas (paginado)',
    status: HttpStatus.OK,
    type: BuscaTudoResponseDTO
  })
  buscarTudo(
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('status') status?: string,
    @Query('busca') busca?: string
  ) {
    return this.sistemasService.buscarTudo(+pagina, +limite, status, busca);
  }

  @Get('lista-completa')
  @ApiResponse({
    description: 'Buscando todos os sistemas',
    status: HttpStatus.OK,
    type: BuscaTudoResponseDTO
  })
  listaCompleta() {
    return this.sistemasService.listaCompleta();
  }
  
  @Get('buscar-por-id/:id')
  @ApiResponse({
    description: 'Buscando sistema por ID.',
    status: HttpStatus.OK,
    type: BuscaTudoResponseDTO
  })
  buscarPorId(@Param('id') id: string) {
    return this.sistemasService.buscarPorId(id);
  }

  @Patch('atualizar/:id')
  @ApiResponse({
    description: 'atualizando um sistema.',
    status: HttpStatus.OK,
    type: CreateSistemaDto
  })
  atualizar(@Param('id') id: string, @Body() updateSistemaDto: UpdateSistemaDto) {
    return this.sistemasService.atualizar(id, updateSistemaDto);
  }

  @Delete('desativar/:id')
  @ApiResponse({
    description: 'Deletando um sistema.',
    status: HttpStatus.OK,
  })
  desativar(@Param('id') id: string) {
    return this.sistemasService.desativar(id);
  }

  @IsPublic()
  @Get('motivo/:id')
  @ApiResponse({
    description: 'Buscando um motivo',
    status: HttpStatus.OK,
  })
  buscaSistemas(@Param('id') id: string) {
    return this.sistemasService.buscaSistemas(id);
  }
}
