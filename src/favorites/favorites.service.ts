import { DataBase } from 'src/database/database';
import { HttpException, Injectable } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class FavoritesService {
  constructor(private readonly dataBase: DataBase) {}

  findAll() {
    return {
      artists: this.dataBase.artists.filter((artist) =>
        this.dataBase.favorites.artists.includes(artist.id),
      ),
      albums: this.dataBase.albums.filter((album) =>
        this.dataBase.favorites.albums.includes(album.id),
      ),
      tracks: this.dataBase.tracks.filter((track) =>
        this.dataBase.favorites.tracks.includes(track.id),
      ),
    };
  }

  createTrack(id: string) {
    const track = this.dataBase.tracks.find((track) => track.id == id);
    if (!track)
      throw new HttpException(
        "track doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    if (!this.dataBase.favorites.tracks.includes(id))
      this.dataBase.favorites.tracks.push(id);
  }

  removeTrack(id: string) {
    const indexTrack = this.dataBase.favorites.tracks.indexOf(id);
    if (indexTrack == -1)
      throw new HttpException(
        `track doesn't exists in favorites`,
        StatusCodes.NOT_FOUND,
      );
    this.dataBase.favorites.tracks.splice(indexTrack, 1);
    return `track id=${id} deleted from favorites`;
  }

  createAlbum(id: string) {
    const album = this.dataBase.albums.find((album) => album.id == id);
    if (!album)
      throw new HttpException(
        "album doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    if (!this.dataBase.favorites.albums.includes(id))
      this.dataBase.favorites.albums.push(id);
  }

  removeAlbum(id: string) {
    const indexAlbum = this.dataBase.favorites.albums.indexOf(id);
    if (indexAlbum == -1)
      throw new HttpException(
        `album doesn't exists in favorites`,
        StatusCodes.NOT_FOUND,
      );
    this.dataBase.favorites.albums.splice(indexAlbum, 1);
    return `album id=${id} deleted from favorites`;
  }

  createArtist(id: string) {
    const artist = this.dataBase.artists.find((artist) => artist.id == id);
    if (!artist)
      throw new HttpException(
        "artist doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    if (!this.dataBase.favorites.artists.includes(id))
      this.dataBase.favorites.artists.push(id);
  }

  removeArtist(id: string) {
    const indexArtist = this.dataBase.favorites.artists.indexOf(id);
    if (indexArtist == -1)
      throw new HttpException(
        `artist doesn't exists in favorites`,
        StatusCodes.NOT_FOUND,
      );
    this.dataBase.favorites.artists.splice(indexArtist, 1);
    return `artist id=${id} deleted from favorites`;
  }
}
