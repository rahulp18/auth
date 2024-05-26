import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTasksDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  desc: string;
}
