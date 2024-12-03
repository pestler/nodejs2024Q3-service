import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
//import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './dto/auth.entity';
import { DataBase } from 'src/database/database';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private dataBase: DataBase, private jwtService: JwtService) {}

  async login(login: string, password: string): Promise<AuthEntity> {
    const user: User | undefined = this.dataBase.users.find(
      (user) => user.login === login,
    );

    if (!user) {
      throw new NotFoundException(`No user found for login: ${login}`);
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
