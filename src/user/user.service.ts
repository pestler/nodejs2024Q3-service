import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NoPasswordUser, User } from 'src/database/interface';
import { v4 as uuid } from 'uuid';
import { dataBase } from 'src/database/database';

@Injectable()
export class UserService {
  deletePassword(val: User): NoPasswordUser {
    const copyVal = { ...val };
    delete copyVal.password;
    return copyVal;
  }

  create(createUserDto: CreateUserDto): NoPasswordUser {
    const user: User = {
      id: uuid(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    dataBase.users.push(user);
    return this.deletePassword(user);
  }

  findAll(): NoPasswordUser {
    const user: User = dataBase.users.find((user) => user.password);
    return this.deletePassword(user);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
