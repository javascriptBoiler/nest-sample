import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminAuthService } from './admin.auth.service';
import { AuthController } from './auth.controller';
import { GoogleController } from './google/google.controller';
import { FacebookController } from './facebook/facebook.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthService, AdminAuthService, JwtStrategy, UserService],
  controllers: [AuthController, GoogleController, FacebookController],
})
export class AuthModule {}
