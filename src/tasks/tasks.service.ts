import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTasksDTO } from './dto/create-tasks.dto';
import { Task } from '@prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTasksDto: CreateTasksDTO, userId: number): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        ...createTasksDto,
        userId,
      },
    });
    return task;
  }
  async update(updateTasksDto: UpdateTaskDto, taskId: number): Promise<Task> {
    const task = await this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...updateTasksDto,
      },
    });
    return task;
  }
  async getTasks(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({});
    return tasks;
  }
  async getTaskById(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    return task;
  }
  async deleteTask(id: number): Promise<string> {
    await this.prisma.task.delete({
      where: {
        id,
      },
    });
    return 'task deleted';
  }
}
