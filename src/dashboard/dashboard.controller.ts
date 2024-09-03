import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';
import { Usuario } from '@prisma/client';


@Controller('chamados')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get("abertos")
  buscarChamadosAbertos(
    @UsuarioAtual() user: Usuario
  ) {
    return this.dashboardService.buscarChamadosAbertos(user.id);
  }

  @Get("atribuidos")
  buscarChamadosAtribuidos(
    @UsuarioAtual() user: Usuario
  ) {
    return this.dashboardService.buscarChamadosAtribuidos(user.id);
  }

  @Get("tecnicos")
  buscaTecnicos(
    @UsuarioAtual() user: Usuario
  ) {
    return this.dashboardService.buscaTecnicos(user.id);
  }

}
