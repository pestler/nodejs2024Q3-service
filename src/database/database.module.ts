import { Module } from '@nestjs/common';
import { DataBase } from './database';

@Module({
  exports: [DataBase],
  providers: [DataBase],
})
export class DataBaseModule {}
