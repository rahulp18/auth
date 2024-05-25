import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: any): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });
  }
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
  async findUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
  async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }
  async update(id: number, userInfo: Partial<User>): Promise<any> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: userInfo,
    });
  }
}
