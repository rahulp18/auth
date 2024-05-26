import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterResponseDTO } from './dtos/register-response.dto';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { LoginResponseDTO } from './dtos/login-response.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<LoginResponseDTO | BadRequestException> {
    return this.authService.login(req.user);
  }
  @Public()
  @Post('register')
  async register(
    @Body() registerBody: RegisterRequestDto,
  ): Promise<RegisterResponseDTO | BadRequestException> {
    return await this.authService.register(registerBody);
  }
}
