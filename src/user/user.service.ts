import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NoPasswordUser, User } from 'src/database/interface';
import { v4 as uuid } from 'uuid';
import { dataBase } from 'src/database/database';

@Injectable()
export class UserService {
  HidePasswordUser(val: User): NoPasswordUser {
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
    return this.HidePasswordUser(user);
  }

  findAll() {
    return dataBase.users.map((user) => {
      const { password, ...usersHidePassword } = user;
      console.log(`hide password ${password}`);
      return usersHidePassword;
    });
  }

  findOne(id: string) {
    const user = dataBase.users.find((user) => user.id == id);
    if (!user) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    }
    return this.HidePasswordUser(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = dataBase.users.find((user) => user.id == id);
    if (!user)
      throw new HttpException("user doesn't exit", HttpStatus.NOT_FOUND);
    if (user.password !== updateUserDto.oldPassword)
      throw new HttpException('old password invalid', HttpStatus.FORBIDDEN);

    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    user.version++;
    console.log(user.password);
    console.log(user);
    return this.HidePasswordUser(user);
  }

  remove(id: string) {
    const indexUser = dataBase.users.findIndex((user) => user.id == id);
    if (indexUser == -1)
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    dataBase.users.splice(indexUser, 1);
    return `User id=${id} deleted`;
  }
}
