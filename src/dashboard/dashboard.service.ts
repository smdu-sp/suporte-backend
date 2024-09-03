import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) { }

  async buscarChamadosAbertos(id: string) {
    const usr = await this.prisma.usuarioSistema.findMany({
      where: { usuario_id: id },
      select: { sistema: { select: { id: true, } } }
    });
    if (!usr) throw new ForbiddenException('Usuário não encontrado no sistema');

    const chamados = await this.prisma.ordem.count({
      where: {
        AND: [
          { status: 1 },
          { sistema_id: usr[0].sistema.id }
        ]
      }
    })

    let dataAtual = new Date();
    dataAtual.setHours(dataAtual.getHours() - 3);

    const abertos_hoje = await this.prisma.ordem.count({
      where: {
        AND: [
          { sistema_id: usr[0].sistema.id },
          { data_solicitacao: { gte: dataAtual } }
        ]
      }
    });

    return {
      chamados,
      hoje: abertos_hoje
    };
  }

  async buscarChamadosAtribuidos(id: string) {
    const usr = await this.prisma.usuarioSistema.findMany({
      where: { usuario_id: id },
      select: { sistema: { select: { id: true, } } }
    });
    if (!usr) throw new ForbiddenException('Usuário não encontrado no sistema');

    const chamados = await this.prisma.ordem.count({
      where: {
        AND: [
          { status: 2 },
          { sistema_id: usr[0].sistema.id }
        ]
      }
    })

    let dataAtual = new Date();
    dataAtual.setHours(dataAtual.getHours() - 3);

    const encerrados_hoje = await this.prisma.ordem.count({
      where: {
        AND: [
          { sistema_id: usr[0].sistema.id },
          { data_solicitacao: { gte: dataAtual } },
          { status: 3 }
        ]
      }
    });

    return { 
      chamados,
      encerrados_hoje
    };
  }

  async buscaTecnicos(id: string) {
    const usr = await this.prisma.usuarioSistema.findMany({
      where: { usuario_id: id },
      select: { sistema: { select: { id: true, } } }
    });
    if (!usr) throw new ForbiddenException('Usuário não encontrado no sistema');
    const tecnicos = await this.prisma.usuarioSistema.findMany({
      where: {
        OR : [
          { permissao: 'TEC' },
          { permissao: 'ADM' },
        ],
        AND: [
          { sistema_id: usr[0].sistema.id }
        ]
      },
      select: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            avatar: true
          }
        }
      }
    })

    return {tecnicos}
  } 
}
