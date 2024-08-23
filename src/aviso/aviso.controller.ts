import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AvisoService } from './aviso.service';
import { CreateAvisoDto } from './dto/create-aviso.dto';
import { UpdateAvisoDto } from './dto/update-aviso.dto';
import { Aviso } from './entities/aviso.entity';
import { Permissoes } from 'src/auth/decorators/permissoes.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('avisos')
export class AvisoController {
  constructor(private readonly avisoService: AvisoService) {}

  @IsPublic()
  @Get('')
  buscarTudo(
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('status') status?: string,
    @Query('busca') busca?: string
  ) {
    return this.avisoService.buscarTudo(+pagina, +limite, status, busca);
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string): Promise<Aviso> {
    return this.avisoService.buscarPorId(id);
  }

  //@Permissoes('ADM')
  @Post('criar')
  async criar(@Body() createAvisoDto: CreateAvisoDto): Promise<Aviso> {
    return this.avisoService.criar(createAvisoDto);
  }

  //@Permissoes('ADM')
  @Patch('atualizar/:id')
  async atualizar(
    @Param('id') id: string, 
    @Body() updateAvisoDto: UpdateAvisoDto
  ): Promise<Aviso> {  
    return this.avisoService.atualizar(id, updateAvisoDto);
  }

  @Patch('ativa/:id')
  async ativar(@Param('id') id: string): Promise<Aviso> {  
    return this.avisoService.ativa(id);
  }

  @Patch('inativa/:id')
  async inativa(@Param('id') id: string ): Promise<Aviso> {  
    return this.avisoService.inativa(id);
  }

  //@Permissoes('ADM')
  @Delete('remover/:id')
  async remover(@Param('id') id: string): Promise<Aviso> {
    return this.avisoService.remover(id);
  }
}

