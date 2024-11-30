import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DataBaseModule } from 'src/database/database.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [DataBaseModule, PrismaModule],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
