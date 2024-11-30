import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(): Favorite {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  createTrack(@Param('id', ParseUUIDPipe) id: string): Track {
    return this.favoritesService.createTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', ParseUUIDPipe) id: string): void {
    return this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  createAlbum(@Param('id', ParseUUIDPipe) id: string): Album {
    return this.favoritesService.createAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  createArtist(@Param('id', ParseUUIDPipe) id: string): Artist {
    return this.favoritesService.createArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', ParseUUIDPipe) id: string): void {
    return this.favoritesService.removeArtist(id);
  }
}
