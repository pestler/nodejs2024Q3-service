import { dataBase } from './../database/database';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from 'src/database/interface';
import { v4 as uuid } from 'uuid';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class AlbumsService {
  create(createAlbumDto: CreateAlbumDto): Album[] {
    const album = {
      id: uuid(),
      ...createAlbumDto,
    };
    dataBase.albums.push(album);
    return dataBase.albums;
  }

  findAll() {
    return dataBase.albums;
  }

  findOne(id: string) {
    return dataBase.albums.find((album) => album.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = dataBase.albums.find((album) => album.id == id);
    if (!album)
      throw new HttpException("album doesn't exists", StatusCodes.NOT_FOUND);
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return album;
  }

  remove(id: string) {
    const indexAlbum = dataBase.albums.findIndex((album) => album.id == id);
    if (indexAlbum == -1)
      throw new HttpException("album doesn't exists", StatusCodes.NOT_FOUND);
    dataBase.albums.splice(indexAlbum, 1);
  }
}
