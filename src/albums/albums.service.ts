import { DataBase } from './../database/database';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuid } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(private dataBase: DataBase) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    const album = new Album({
      id: uuid(),
      ...createAlbumDto,
    });
    this.dataBase.albums.push(album);
    return album;
  }

  findAll(): Album[] {
    return this.dataBase.albums;
  }

  findOne(id: string): Album {
    const album = this.dataBase.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.findOne(id);
    if (!album)
      throw new HttpException("album doesn't exists", StatusCodes.NOT_FOUND);
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return album;
  }

  remove(id: string | Album) {
    const indexAlbum = this.dataBase.albums.findIndex(
      (album) => album.id == id,
    );
    if (indexAlbum == -1)
      throw new HttpException("album doesn't exists", StatusCodes.NOT_FOUND);
    this.dataBase.albums.splice(indexAlbum, 1);

    this.dataBase.tracks
      .filter((track) => track.albumId == id)
      .forEach((track) => (track.albumId = null));

    this.dataBase.favorites.albums = this.dataBase.favorites.albums.filter(
      (albumId) => albumId != id,
    );

    return `Album id=${id} deleted`;
  }
}
