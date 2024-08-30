import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { UsuarioAtual } from './decorators/usuario-atual.decorator';
import { Usuario } from '@prisma/client';
import { RefreshAuthGuard } from './guards/refresh.guard';
import { ApiBody, ApiCreatedResponse, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuarioToken } from './models/UsuarioToken';

export class LoginDTO {
  @ApiProperty({
    description: 'Username do login',
    example: 'x123456',
  })
  login: string;
  @ApiProperty({
    description: 'A sua senha',
    example: 'senha123',
  })
  senha: string;
}

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') //localhost:3000/login
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @IsPublic()
  @ApiBody({
    description: 'Senha e login para autenticação por JWT',
    type: LoginDTO
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna 200 se tiver sucesso no login.'
  })
  @ApiCreatedResponse({ type: UsuarioToken })
  async login(@Request() req: AuthRequest): Promise<UsuarioToken> {
    return await this.authService.login(req.user);
  }

  @Post('refresh') //localhost:3000/refresh
  @IsPublic()
  @UseGuards(RefreshAuthGuard)
  refresh(@UsuarioAtual() usuario: Usuario) {
    return this.authService.refresh(usuario);
  }

  @Get('eu')
  usuarioAtual(@UsuarioAtual() usuario: Usuario) {
    return usuario;
  }
}
