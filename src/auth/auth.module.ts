import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
/* import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard'; */

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY || 'jwt777',
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
