import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: true})
export class ChamadosGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('servicos')
  handleMessage(client: any): void {
    try {
      const novosServicos = true;
      this.server.emit('servicos', novosServicos);
    } catch (error) {
      console.log(error);
    }
  }
}
