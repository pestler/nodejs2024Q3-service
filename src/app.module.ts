import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './src/users/users.module';
import { TracksModule } from './src/tracks/tracks.module';
import { ArtistsModule } from './src/artists/artists.module';
import { FavoritesModule } from './src/favorites/favorites.module';
import { AlbumsService } from './src/albums/albums.service';
import { AlbumsModule } from './src/albums/albums.module';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    ArtistsModule,
    FavoritesModule,
    AlbumsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AlbumsService],
})
export class AppModule {}
