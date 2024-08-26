import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioTipoService } from './usuario_tipo.service';
import { CreateUsuarioTipoDto } from './dto/create-usuario_tipo.dto';
import { UpdateUsuarioTipoDto } from './dto/update-usuario_tipo.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('usuario-tipo')
export class UsuarioTipoController {
  constructor(private readonly usuarioTipoService: UsuarioTipoService) {}

  @IsPublic()
  @Post()
  async create(@Body() createUsuarioTipoDto: CreateUsuarioTipoDto) {
    return await this.usuarioTipoService.create(createUsuarioTipoDto);
  }

  @Get()
  findAll() {
    return this.usuarioTipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioTipoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioTipoDto: UpdateUsuarioTipoDto) {
    return this.usuarioTipoService.update(+id, updateUsuarioTipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioTipoService.remove(+id);
  }
}
