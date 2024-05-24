import { Controller, Get, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { User } from '../../../decorator/user.decorator';
import { AuthService } from '../auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('google-web')
@Controller('google')
export class GoogleController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return HttpStatus.OK;
  }

  // call same as facebook does
  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@User() user) {
    // check if youser in the DB
    //if not
    // register user
    // if yes
    // login with the user
    return user;
    //return this.authService.registerUser(user)
  }
}
