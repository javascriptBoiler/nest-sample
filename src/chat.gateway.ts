import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
@WebSocketGateway(+process.env.SOCKET_SERVER_PORT || 8081, { cors: true })
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }

  @SubscribeMessage('createRoom')
  createRoom(socket: Socket, data: any): void {
    socket.join(data.room);
    console.log(`joined into room ::: ${data.room}`);
    this.server.to(data.room).emit('roomCreated', { room: data.room });
  }

  @SubscribeMessage('register')
  userRegister(socket: Socket, data: any): void {
    socket.join(data.room);
    console.log(`1 to 1 message room ::: ${data.room}`);
  }
}
