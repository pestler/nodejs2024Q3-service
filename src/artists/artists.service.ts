import { DataBase } from './../database/database';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuid } from 'uuid';
import { Artist } from 'src/database/interface';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class ArtistsService {
  constructor(private dataBase: DataBase) {}

  create(createArtistDto: CreateArtistDto): Artist[] {
    const artist = { id: uuid(), ...createArtistDto };
    this.dataBase.artists.push(artist);
    return this.dataBase.artists;
  }

  findAll(): Artist[] {
    return this.dataBase.artists;
  }

  findOne(id: string) {
    return this.dataBase.artists.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.dataBase.artists.find((artist) => artist.id == id);
    if (!artist)
      throw new HttpException("artist doesn't exist", StatusCodes.NOT_FOUND);
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }

  remove(id: string) {
    const indexArtist = this.dataBase.artists.findIndex(
      (artist) => artist.id == id,
    );
    if (indexArtist == -1)
      throw new HttpException("artist doesn't exist", StatusCodes.NOT_FOUND);
    this.dataBase.artists.splice(indexArtist, 1);
  }
}
