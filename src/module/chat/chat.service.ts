import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserTokenDto } from '../user/dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async getUnreadCount(user: UserTokenDto, receiver: string): Promise<any> {
    const unreadMessages = await this.prisma.chat.findMany({
      where: {
        receiver: +receiver,
        sender: +user.id,
        isRead: false,
      },
      orderBy: { id: 'desc' },
    });
    return {
      user,
      unreadCount: unreadMessages.length,
      lastMessage: unreadMessages[0] || {},
    };
  }

  async getUserMessages(user: UserTokenDto, receiver: string): Promise<any> {
    const messages = await this.prisma.chat.findMany({
      skip: 0,
      take: 40,
      where: {
        OR: [
          { sender: +user.id, receiver: +receiver },
          { sender: +receiver, receiver: +user.id },
        ],
      },
      orderBy: { id: 'desc' },
    });

    const selectedUser = await this.prisma.user.findUnique({
      where: {
        id: +receiver,
      },
    });

    return { messages, selectedUser };
  }

  async listMessages(user: UserTokenDto, data: any): Promise<any> {
    return await this.prisma.chat.findMany({
      skip: 0,
      take: 40,
      where: {
        OR: [
          { sender: +user.id, receiver: +data.receiver },
          { sender: +data.receiver, receiver: +user.id },
        ],
      },
      orderBy: { id: 'desc' },
    });
  }

  async createMessages(user: UserTokenDto, data: any): Promise<any> {
    return await this.prisma.chat.create({
      data: {
        message: data.message,
        sender: +user.id,
        receiver: +data.receiver,
        productRequestID: 1,
      },
    });
  }

  async readMessages(user: UserTokenDto, id: any): Promise<any> {
    return await this.prisma.chat.updateMany({
      where: {
        sender: +id,
        receiver: +user.id,
      },
      data: {
        isRead: true,
      },
    });
  }
}
