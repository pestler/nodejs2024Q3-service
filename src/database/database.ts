import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DataBase {
  public users: User[] = [];
  public artists: Artist[] = [];
  public albums: Album[] = [];
  public tracks: Track[] = [];
  public favorites: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
