import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'The password must contain at least 1 characters' })
  @MaxLength(15, { message: 'The password must not exceed 15 characters' })
  password: string;
}
