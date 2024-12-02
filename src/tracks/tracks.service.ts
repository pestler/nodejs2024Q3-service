import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
//import { v4 as uuid } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Track } from './entities/track.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.prisma.track.create({ data: createTrackDto });
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) {
      throw new NotFoundException('track not found');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: updateTrackDto,
      });
    } catch (error) {
      throw new HttpException("Track doesn't exist", StatusCodes.NOT_FOUND);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.track.delete({ where: { id } });
    } catch (error) {
      throw new HttpException("Track doesn't exist", StatusCodes.NOT_FOUND);
    }
  }
}
