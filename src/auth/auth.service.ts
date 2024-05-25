import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { AccessToken } from './types/AccessToken';
import { RegisterRequestDto } from './dtos/register-request.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }
  async login(user: User): Promise<AccessToken> {
    const payload = { email: user.email, role: user.role, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
  async register(user: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.usersService.findUserByEmail(user.email);
    console.log(existingUser);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    console.log(user);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };
    const data = await this.usersService.createUser(newUser);
    return this.login(data);
  }
}
