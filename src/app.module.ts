import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsModule } from './albums/albums.module';
import { AlbumsService } from './albums/albums.service';
import { ArtistsModule } from './artists/artists.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

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
