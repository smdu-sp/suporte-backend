import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Permissoes } from 'src/auth/decorators/permissoes.decorator';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';
import { Usuario } from '@prisma/client';
import { ApiBearerAuth, ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

class UsuarioResponse {
  @ApiProperty()
  total: number;
  @ApiProperty()
  pagina: number;
  @ApiProperty()
  limite: number;
  @ApiProperty()
  data: any[]
}

@ApiBearerAuth()
@ApiTags('usuarios')
@Controller('usuarios') //localhost:3000/usuarios
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Permissoes('ADM')
  @Post('criar') //localhost:3000/usuarios/criar
  criar(
    @UsuarioAtual() usuario: Usuario,
    @Body() createUsuarioDto: CreateUsuarioDto,
  ) {
    return this.usuariosService.criar(createUsuarioDto, usuario);
  }

  @Permissoes('ADM')
  @Get('buscar-tudo') //localhost:3000/usuarios/buscar-tudo
  @ApiQuery({ name: 'pagina', type: 'string', required: false })
  @ApiQuery({ name: 'limite', type: 'string', required: false })
  @ApiQuery({ name: 'status', type: 'string', required: false })
  @ApiQuery({ name: 'busca', type: 'string', required: false })
  @ApiQuery({ name: 'unidade_id', type: 'string', required: false })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna 200 se conseguir buscar os usuarios.',
    type: UsuarioResponse
  })
  buscarTudo(
    @UsuarioAtual() usuario: Usuario,
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('status') status?: string,
    @Query('busca') busca?: string,
    @Query('unidade_id') unidade_id?: string,
  ) {
    return this.usuariosService.buscarTudo(usuario, +pagina, +limite, +status, busca, unidade_id);
  }
  
  @Permissoes('ADM')
  @Get('buscar-por-id/:id') //localhost:3000/usuarios/buscar-por-id/id
  buscarPorId(@Param('id') id: string) {
    return this.usuariosService.buscarPorId(id);
  }

  @Permissoes('ADM', 'TEC', 'USR')
  @Patch('atualizar/:id') //localhost:3000/usuarios/atualizar/id
  atualizar(
    @UsuarioAtual() usuario: Usuario,
    @Param('id') id: string,
    @Body() updateUsuarioDto: CreateUsuarioDto,
  ) {
    return this.usuariosService.atualizar(usuario, id, updateUsuarioDto);
  }

  @Permissoes('ADM', 'TEC')
  @Get('lista-completa')
  listaCompleta() {
    return this.usuariosService.listaCompleta();
  }

  @Permissoes('ADM')
  @Delete('desativar/:id') //localhost:3000/usuarios/excluir/id
  excluir(@Param('id') id: string) {
    return this.usuariosService.excluir(id);
  }

  @Permissoes('ADM') 
  @Patch('autorizar/:id')
  autorizarUsuario(@Param('id') id: string) {
    return this.usuariosService.autorizaUsuario(id);
  }

  @Get('valida-usuario')
  validaUsuario(@UsuarioAtual() usuario: Usuario) {
    return this.usuariosService.validaUsuario(usuario.id);
  }

  @Permissoes('ADM')
  @Get('buscar-novo')
  buscarNovo(@Query('login') login: string) {
    return this.usuariosService.buscarNovo(login);
  }
}
