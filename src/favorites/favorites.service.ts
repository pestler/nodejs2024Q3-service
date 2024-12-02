import { Artist } from './../artists/entities/artist.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';
import { PrismaService } from 'src/prisma/prisma.service';

export type IFavEntity = 'track' | 'album' | 'artist';

const FAVORITES_ID = null;

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  private async initFavorites(): Promise<void> {
    const favorites = await this.prisma.favorites.findUnique({
      where: { id: FAVORITES_ID },
    });

    if (!favorites) {
      await this.prisma.favorites.create({
        data: { id: FAVORITES_ID },
      });
    }
  }

  async findAll() {
    return await this.prisma.favorites.findFirst({
      include: { artists: true, albums: true, tracks: true },
    });
  }
  private async validateEntity(favEntity: IFavEntity | string, id: string) {
    let entity: Track | Album | Artist;

    switch (favEntity) {
      case 'track':
        entity = await this.prisma.track.findUnique({ where: { id } });
        break;
      case 'album':
        entity = await this.prisma.album.findUnique({ where: { id } });
        break;
      case 'artist':
        entity = await this.prisma.artist.findUnique({ where: { id } });
        break;
      default:
        throw new UnprocessableEntityException('Invalid favorite entity');
    }

    if (!entity) {
      throw new UnprocessableEntityException(
        `${favEntity.charAt(0).toUpperCase() + favEntity.slice(1)} not found`,
      );
    }

    return entity;
  }

  async add(favEntity: IFavEntity, id: string) {
    await this.validateEntity(favEntity, id);
    await this.prisma.favorites.update({
      where: { id: FAVORITES_ID },
      data: {
        [favEntity + 's']: { connect: { id } },
      },
    });
  }

  async remove(favEntity: IFavEntity, id: string) {
    const removedEntity = await this.validateEntity(favEntity, id);

    if (removedEntity) {
      await this.prisma.favorites.update({
        where: { id: FAVORITES_ID },
        data: {
          [favEntity + 's']: { disconnect: { id } },
        },
      });
    }
  }
}
