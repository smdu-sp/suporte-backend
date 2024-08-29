import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Headers } from '@nestjs/common';
import { UsuarioTipoService } from './usuario_tipo.service';
import { CreateUsuarioTipoDto } from './dto/create-usuario_tipo.dto';
import { UpdateUsuarioTipoDto } from './dto/update-usuario_tipo.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UsuarioTipo } from './entities/usuario_tipo.entity';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('usuario_tipo')
@Controller('usuario-tipo')
export class UsuarioTipoController {
  constructor(
    private readonly usuarioTipoService: UsuarioTipoService
  ) {}

  @IsPublic()
  @Post()
  async criar(
    @Body() createUsuarioTipoDto: CreateUsuarioTipoDto,
    @Headers('Authorization') token: string
  ): Promise<UsuarioTipo> {
    const novo_usuario_tipo = await this.usuarioTipoService.criar(createUsuarioTipoDto, token.replace('Bearer ', ''));
    if (!novo_usuario_tipo) return
    return novo_usuario_tipo;
  }

  @Get()
  async buscarTudo(): Promise<UsuarioTipo[]> {
    const usuario_tipo_array = await this.usuarioTipoService.buscarTudo();
    if (!usuario_tipo_array) return
    return usuario_tipo_array;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usuarioTipoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUsuarioTipoDto: UpdateUsuarioTipoDto) {
  //   return this.usuarioTipoService.update(+id, updateUsuarioTipoDto);
  // }

  // @Delete('remover/:id')
  // async remove(@Param('id') id: string): Promise<UsuarioTipo> {
  //   return await this.usuarioTipoService.remove(id);
  // }
}
