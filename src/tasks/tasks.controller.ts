import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateTasksDTO } from './dto/create-tasks.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { IsOwner } from './decorators/is-owner.decorator';
import { AuthGuard } from '@nestjs/passport';
import { OwnershipGuard } from './guards/ownership.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'), OwnershipGuard, RoleGuard)
export class TasksController {
  constructor(private tasksServices: TasksService) {}
  @Post('create')
  create(@Body() createTasksDto: CreateTasksDTO, @Req() req) {
    return this.tasksServices.create(createTasksDto, req.user.id);
  }
  @Roles('ADMIN', 'USER')
  @IsOwner()
  @Put(':id')
  update(
    @Body() updateTasksDto: UpdateTaskDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tasksServices.update(updateTasksDto, id);
  }
  @Roles('ADMIN', 'USER')
  @IsOwner()
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tasksServices.deleteTask(id);
  }
  @Public()
  @Get()
  getAllTasks() {
    return this.tasksServices.getTasks();
  }
  @Public()
  @Get(':id')
  getTask(@Param('id', ParseIntPipe) id: string) {
    return this.tasksServices.getTaskById(+id);
  }
}
