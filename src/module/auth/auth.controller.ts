import {
  BadRequestException,
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminAuthService } from './admin.auth.service';

import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto, LoginUserDto } from './dto';
import { UserService } from '../user/user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminAuthService: AdminAuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerRequest: RegisterUserDto) {
    try {
      return await this.authService.registerUser(registerRequest);
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() authenticateRequest: LoginUserDto) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('admin/register')
  async registerAdmin(@Body() registerRequest: RegisterUserDto) {
    try {
      return await this.adminAuthService.registerUser(registerRequest);
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('admin/login')
  async loginAsAdmin(@Body() authenticateRequest: LoginUserDto) {
    try {
      const loginData: any = await this.adminAuthService.authenticateUser(
        authenticateRequest,
      );
      const user = await this.userService.findUser({
        sub: loginData?.idToken?.payload?.sub,
        email: loginData?.idToken?.payload?.email,
      });
      return { ...loginData, user };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
