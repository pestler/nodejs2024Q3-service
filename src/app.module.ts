import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './src/album/album.module';
import { UsersModule } from './src/users/users.module';
import { TracksModule } from './src/tracks/tracks.module';
import { ArtistsModule } from './src/artists/artists.module';
import { FavoritesModule } from './src/favorites/favorites.module';

@Module({
  imports: [
    AlbumModule,
    UsersModule,
    TracksModule,
    ArtistsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
