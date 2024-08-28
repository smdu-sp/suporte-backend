import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usuariosService: UsuariosService,
  ) {}

  verificaPermissoes(permissoes: string[], permissoesUsuario: string[]) {
    return permissoes.some((role) => permissoesUsuario.includes(role));
  }

  async canActivate(context: ExecutionContext) {
    const permissoes = this.reflector.get<string[]>(
      'permissoes',
      context.getHandler(),
    );
    if (!permissoes) return true;
    const request = context.switchToHttp().getRequest();
    const { user: { id } } = request;
    const usuario = await this.usuariosService.buscarPorId(id);
    if (usuario.dev) return true;
    const permissoesUsuario = await this.usuariosService.permissoes(usuario);
    return this.verificaPermissoes(permissoes, permissoesUsuario);
  }
}
