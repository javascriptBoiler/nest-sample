import { Get, Post, Body, Controller, UsePipes, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UserTokenDto } from './dto';
import { User } from '../../decorator/user.decorator';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('users')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create user just after signup to aws cognito
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth()
  @Post('users')
  async createUser(@User() user: UserTokenDto): Promise<any> {
    const { password, ...userData } = await this.userService.createUser(user);
    return userData;
  }

  @ApiBearerAuth()
  @Get('users')
  async findMe(@User() user: UserTokenDto): Promise<any> {
    return await this.userService.findUser(user);
  }

  @UsePipes(new ValidationPipe())
  @ApiBearerAuth()
  @Patch('users')
  async update(
    @User('sub') cognitoSub: string,
    @Body() userData: UpdateUserDto,
  ) {
    return await this.userService.updateUser(cognitoSub, userData);
  }
}
