import { dataBase } from './../database/database';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuid } from 'uuid';
import { Artist } from 'src/database/interface';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class ArtistsService {
  create(createArtistDto: CreateArtistDto): Artist[] {
    const artist = { id: uuid(), ...createArtistDto };
    dataBase.artists.push(artist);
    return dataBase.artists;
  }

  findAll(): Artist[] {
    return dataBase.artists;
  }

  findOne(id: string) {
    return dataBase.artists.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = dataBase.artists.find((artist) => artist.id == id);
    if (!artist)
      throw new HttpException("artist doesn't exist", StatusCodes.NOT_FOUND);
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }

  remove(id: string) {
    const indexArtist = dataBase.artists.findIndex((artist) => artist.id == id);
    if (indexArtist == -1)
      throw new HttpException("artist doesn't exist", StatusCodes.NOT_FOUND);
    dataBase.artists.splice(indexArtist, 1);
  }
}
