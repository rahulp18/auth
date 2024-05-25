import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UsersService, PrismaService],
  controllers: [],
  exports: [UsersService],
})
export class UsersModule {}
