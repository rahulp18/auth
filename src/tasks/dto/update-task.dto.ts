import { PartialType } from '@nestjs/mapped-types';
import { CreateTasksDTO } from './create-tasks.dto';

export class UpdateTaskDto extends PartialType(CreateTasksDTO) {}
