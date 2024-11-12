import { dataBase } from './../database/database';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuid } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Track } from 'src/database/interface';

@Injectable()
export class TracksService {
  create(createTrackDto: CreateTrackDto): Track[] {
    const track = {
      id: uuid(),
      ...createTrackDto,
    };
    dataBase.tracks.push(track);
    return dataBase.tracks;
  }

  findAll() {
    return dataBase.tracks;
  }

  findOne(id: string) {
    return dataBase.tracks.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    if (!track)
      throw new HttpException("Track doesn't exist", StatusCodes.NOT_FOUND);
    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;
    return track;
  }

  remove(id: string) {
    const indexTrack = dataBase.tracks.findIndex((track) => track.id == id);
    if (indexTrack == -1)
      throw new HttpException("Track doesn't exist", StatusCodes.NOT_FOUND);
    dataBase.tracks.splice(indexTrack, 1);
    return `Track id=${id} deleted`;
  }
}
