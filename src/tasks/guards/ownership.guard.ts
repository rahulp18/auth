import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PrismaService } from 'src/prisma/prisma.service';
import { IS_OWNER_KEY } from '../decorators/is-owner.decorator';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isOwner = this.reflector.getAllAndOverride<boolean>(IS_OWNER_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!isOwner) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const taskId = +request.params.id;
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      throw new ForbiddenException('Task not found');
    }
    if (task.userId !== user.id) {
      throw new ForbiddenException('You do not have access to this task');
    }
    return true;
  }
}
