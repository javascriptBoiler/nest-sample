import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';

const providers = [PrismaService, ConfigService];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
