import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { ChatModule } from './module/chat/chat.module';
import { AuthModule } from './module/auth/auth.module';

import { ConfigModule } from '@nestjs/config';
import { ChatGateway } from './chat.gateway';
import { SharedModule } from './shared/shared.module';

import { JwtStrategy } from './module/auth/jwt.strategy';
import { GoogleStrategy } from './module/auth/google/google.strategy';
import { FacebookStrategy } from './module/auth/facebook/facebook.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    UserModule,
    ChatModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ChatGateway,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
  ],
})
export class AppModule {}
