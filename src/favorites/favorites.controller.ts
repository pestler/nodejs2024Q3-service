import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { IFavEntity, FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll(): Promise<Favorite> {
    return this.favoritesService.findAll();
  }
  @Post(':entityType/:id')
  async addToFavorites(
    @Param('entityType') entityType: IFavEntity,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.favoritesService.add(entityType, id);

    return `${
      entityType.charAt(0).toUpperCase() + entityType.slice(1)
    } successfully added to favorites`;
  }

  @Delete(':entityType/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFromFavorites(
    @Param('entityType') entityType: IFavEntity,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.favoritesService.remove(entityType, id);
  }
}
