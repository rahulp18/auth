import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { OwnershipGuard } from './guards/ownership.guard';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService, OwnershipGuard],
})
export class TasksModule {}
