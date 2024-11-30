import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataBaseModule } from 'src/database/database.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [DataBaseModule, PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
