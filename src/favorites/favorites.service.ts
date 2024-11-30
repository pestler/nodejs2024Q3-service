import { Artist } from './../artists/entities/artist.entity';
import { DataBase } from 'src/database/database';
import { HttpException, Injectable } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { Favorite } from './entities/favorite.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly dataBase: DataBase) {}

  findAll(): Favorite {
    const artists: Artist[] = this.dataBase.favorites.artists;
    const albums: Album[] = this.dataBase.favorites.albums;
    const tracks: Track[] = this.dataBase.favorites.tracks;
    const favorite: Favorite = { artists, albums, tracks };
    return favorite;
  }

  createTrack(id: string): Track {
    const track: Track | undefined = this.dataBase.tracks.find(
      (track) => track.id == id,
    );
    if (!track)
      throw new HttpException(
        "track doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    this.dataBase.favorites.tracks.push(track);
    return track;
  }

  removeTrack(id: string): void {
    const indexTrack = this.dataBase.favorites.tracks.findIndex(
      (track) => track.id === id,
    );
    this.dataBase.favorites.tracks.splice(indexTrack, 1);
  }

  createAlbum(id: string): Album {
    const album = this.dataBase.albums.find((album) => album.id == id);
    if (!album)
      throw new HttpException(
        "album doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    this.dataBase.favorites.albums.push(album);
    return album;
  }

  removeAlbum(id: string): void {
    const indexAlbum = this.dataBase.favorites.albums.findIndex(
      (album) => album.id === id,
    );
    this.dataBase.favorites.albums.splice(indexAlbum, 1);
  }

  createArtist(id: string): Artist {
    const artist = this.dataBase.artists.find((artist) => artist.id == id);
    if (!artist)
      throw new HttpException(
        "artist doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    this.dataBase.favorites.artists.push(artist);
    return artist;
  }

  removeArtist(id: string): void {
    const indexArtist = this.dataBase.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    this.dataBase.favorites.artists.splice(indexArtist, 1);
  }
}
