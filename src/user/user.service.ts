import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';
import { DataBase } from 'src/database/database';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private dataBase: DataBase) {}

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

    this.dataBase.users.push(entity);
    const hidePasswordUser: Omit<User, 'password'> = {
      login,
      ...userInfo,
    };

    return hidePasswordUser;
  }

  findAll() {
    return this.dataBase.users.map((user) => this.HidePasswordUser(user));
  }

  findOne(id: string) {
    const user = this.dataBase.users.find((user) => user.id == id);
    if (!user) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    }
    return this.HidePasswordUser(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.dataBase.users.find((user) => user.id == id);
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
    const indexUser = this.dataBase.users.findIndex((user) => user.id == id);
    if (indexUser == -1)
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    this.dataBase.users.splice(indexUser, 1);
    return `User id=${id} deleted`;
  }
}
