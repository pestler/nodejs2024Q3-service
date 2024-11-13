import { Injectable } from '@nestjs/common';
import { Artist, Album, Track, Favorites } from './interface';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DataBase {
  public users: User[] = [];
  public artists: Artist[] = [];
  public albums: Album[] = [];
  public tracks: Track[] = [];
  public favorites: Favorites = { artists: [], albums: [], tracks: [] };
}
