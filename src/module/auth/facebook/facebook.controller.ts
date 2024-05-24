import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from '../../../decorator/user.decorator';
import { AuthService } from '../auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('facebook-web')
@Controller('facebook')
export class FacebookController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('facebook'))
  facebookLogin() {
    return HttpStatus.OK;
  }

  // call same as facebook does
  @Get('redirect')
  @UseGuards(AuthGuard('facebook'))
  facebookAuthRedirect(@User() user) {
    // check if youser in the DB
    //if not
    // register user
    // if yes
    // login with the user
    return this.authService.registerUser(user);
  }
}
