import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../shared/services/prisma.service';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthMiddleware } from '../../middleware/jwt.middleware';

@Module({
  providers: [AuthModule, UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
  imports: [MailModule],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.PATCH },
      );
  }
}
