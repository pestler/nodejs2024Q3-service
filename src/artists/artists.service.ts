import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
//import { v4 as uuid } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Artist } from './entities/artist.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({ data: createArtistDto });
  }

  async findAll(): Promise<Artist[]> {
    const artists = await this.prisma.artist.findMany();
    return artists;
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    try {
      const updatedArtist = await this.prisma.artist.update({
        where: {
          id,
        },
        data: {
          name: updateArtistDto.name,
          grammy: updateArtistDto.grammy,
        },
      });
      return updatedArtist;
    } catch (err) {
      if (err) {
        throw new HttpException("artist doesn't exists", StatusCodes.NOT_FOUND);
      }
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      throw new HttpException("artist doesn't exists", StatusCodes.NOT_FOUND);
    }
  }
}
