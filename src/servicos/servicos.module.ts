import { Module } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { ServicosController } from './servicos.controller';
import { ChamadosGateway } from './sockets/chamados.gateway';

@Module({
  controllers: [ServicosController],
  providers: [ServicosService, ChamadosGateway],
})
export class ServicosModule {}
