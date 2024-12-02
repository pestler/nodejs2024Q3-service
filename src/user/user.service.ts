import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  HidePasswordUser(val: User): Omit<User, 'password'> {
    const copyVal = { ...val };
    delete copyVal.password;
    return copyVal;
  }

  create(createUserDto: CreateUserDto): Omit<User, 'password'> {
    const { login, password } = createUserDto;

    const userInfo = {
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const entity = new User({
      login,
      password,
      ...userInfo,
    });

    this.prisma.user.push(entity);
    const hidePasswordUser: Omit<User, 'password'> = {
      login,
      ...userInfo,
    };

    return hidePasswordUser;
  }

  findAll() {
    return this.prisma.users.map((user) => this.HidePasswordUser(user));
  }

  findOne(id: string): Omit<User, 'password'> {
    const user: User | undefined = this.prisma.users.find(
      (user) => user.id === id,
    );
    if (!user) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    }
    return this.HidePasswordUser(user);
  }

  findLogin(login: string) {
    const user: User | undefined = this.prisma.users.find(
      (user) => user.login === login,
    );
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.prisma.users.find((user) => user.id == id);
    if (!user)
      throw new HttpException("user doesn't exit", HttpStatus.NOT_FOUND);
    if (user.password !== updateUserDto.oldPassword)
      throw new HttpException('old password invalid', HttpStatus.FORBIDDEN);

    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    user.version++;
    return this.HidePasswordUser(user);
  }

  remove(id: string) {
    const indexUser = this.prisma.users.findIndex((user) => user.id == id);
    if (indexUser == -1)
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    this.prisma.users.splice(indexUser, 1);
    return `User id=${id} deleted`;
  }
}
