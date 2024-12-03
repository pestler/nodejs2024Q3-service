import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuid } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Album } from './entities/album.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    const album = new Album({
      id: uuid(),
      ...createAlbumDto,
    });
    this.prisma.album.create({ data: album });
    return album;
  }

  async findAll(): Promise<Album[]> {
    const albums = await this.prisma.album.findMany();
    return albums;
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    try {
      const updatedAlbum = await this.prisma.album.update({
        where: {
          id,
        },
        data: {
          name: updateAlbumDto.name,
          year: updateAlbumDto.year,
          artistId: updateAlbumDto.artistId,
        },
      });
      return updatedAlbum;
    } catch (err) {
      if (err) {
        throw new HttpException("album doesn't exists", StatusCodes.NOT_FOUND);
      }
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      throw new HttpException("album doesn't exists", StatusCodes.NOT_FOUND);
    }
  }
}
