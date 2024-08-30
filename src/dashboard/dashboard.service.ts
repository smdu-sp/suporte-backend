import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return `This action returns all dashboard`;
  }

}
