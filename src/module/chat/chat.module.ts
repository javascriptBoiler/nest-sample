import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from '../../chat.gateway';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserService } from '../user/user.service';
import { JwtAuthMiddleware } from '../../middleware/jwt.middleware';

@Module({
  providers: [UserService, ChatService, ChatGateway, PrismaService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes(
        { path: 'chat/messages', method: RequestMethod.GET },
        { path: 'chat/messages', method: RequestMethod.POST },
        { path: 'chat/messages/read/:id', method: RequestMethod.POST },
        { path: 'chat/messages/user/:id', method: RequestMethod.GET },
        { path: 'chat/messages/unread/count', method: RequestMethod.GET },
      );
  }
}
