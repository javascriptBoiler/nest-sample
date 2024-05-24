import {
  Get,
  Controller,
  Post,
  Body,
  Query,
  Param,
  UsePipes,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { UserService } from '../user/user.service';
import { User } from '../../decorator/user.decorator';
import { ChatGateway } from '../../chat.gateway';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserTokenDto } from '../user/dto/create-user.dto';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

@ApiTags('chat')
@Controller()
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageGateway: ChatGateway,
    private readonly userService: UserService,
  ) {}

  @UsePipes(new ValidationPipe())
  @ApiBearerAuth()
  @Get('chat/messages/user/:id')
  async getUserMessages(
    @User() user: UserTokenDto,
    @Param('id') id: string,
  ): Promise<any> {
    return await this.chatService.getUserMessages(user, id);
  }

  @UsePipes(new ValidationPipe())
  @ApiBearerAuth()
  @Get('chat/messages')
  async listMessages(
    @User() user: UserTokenDto,
    @Query() variables: any,
  ): Promise<any[]> {
    return this.chatService.listMessages(user, variables);
  }

  @UsePipes(new ValidationPipe())
  @ApiBearerAuth()
  @Post('chat/messages')
  async createMessages(
    @User() user: UserTokenDto,
    @Body() data: any,
  ): Promise<any> {
    const message = await this.chatService.createMessages(user, data);
    this.messageGateway.server
      .to(data.room)
      .emit('new_message', { message: data.message });
    return message;
  }

  @UsePipes(new ValidationPipe())
  @ApiBearerAuth()
  @Post('chat/messages/read/:id')
  async readMessages(
    @User() user: UserTokenDto,
    @Param('id') id: string,
  ): Promise<any> {
    return this.chatService.readMessages(user, id);
  }

  @UsePipes(new ValidationPipe())
  @ApiBearerAuth()
  @Get('chat/messages/unread/count')
  async unReadMessageCount(
    @User() user: UserTokenDto,
    @Query('receiver') receiver: string,
  ): Promise<any> {
    return this.chatService.getUnreadCount(user, receiver);
  }
}
