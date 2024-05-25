import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsString()
  @IsNotEmpty()
  name: string;
}
