import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: true})
export class AvatarGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('avatar')
  handleMessage(client: any): void {
    try {
      const novoAvatar = true;
      this.server.emit('avatar', novoAvatar);
    } catch (error) {
      console.log(error);
    }
  }
}
