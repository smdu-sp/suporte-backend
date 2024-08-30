import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { UsuarioSistemaService } from './usuario_sistema.service';
import { CreateUsuarioSistemaDto } from './dto/create-usuario_sistema.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Permissao, Usuario, UsuarioSistema } from '@prisma/client';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuarioSistemaResponseDTO } from './dto/usuario-sistema-response.dto';

@Controller('usuario-sistema')
@ApiBearerAuth()
@ApiTags('usuario-sistema')
export class UsuarioSistemaController {
  constructor(private readonly usuarioSistemaService: UsuarioSistemaService) {}

  @IsPublic()
  @Post()
  @ApiBody({
    description: 'Crie uma relação entre um usuário e um sistema, definindo suas permissões.',
    type: CreateUsuarioSistemaDto
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Retorna 201 se o objeto for criado e salvo no banco com sucesso.',
    type: UsuarioSistemaResponseDTO
  })
  async criar(
    @Body() createUsuarioSistemaDto: CreateUsuarioSistemaDto,
    @UsuarioAtual() usuario: Usuario
  ): Promise<UsuarioSistemaResponseDTO> {
    const novo_usuario_sistema = await this.usuarioSistemaService.criar(createUsuarioSistemaDto, usuario);
    if (!novo_usuario_sistema) return
    return novo_usuario_sistema;
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna 200 se conseguir buscar os dados sem erros.',
    type: UsuarioSistemaResponseDTO
  })
  async buscarTudo(): Promise<UsuarioSistemaResponseDTO[]> {
    const usuario_sistema_array = await this.usuarioSistemaService.buscarTudo();
    if (!usuario_sistema_array) return
    return usuario_sistema_array;
  }
}
