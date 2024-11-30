import { DataBase } from './../database/database';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuid } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(private dataBase: DataBase) {}

  create(createTrackDto: CreateTrackDto): Track {
    const track = new Track({
      id: uuid(),
      ...createTrackDto,
    });
    this.dataBase.tracks.push(track);
    return track;
  }

  findAll() {
    return this.dataBase.tracks;
  }

  findOne(id: string): Track {
    const track = this.dataBase.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('track not found');
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
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
    const indexTrack = this.dataBase.tracks.findIndex(
      (track) => track.id == id,
    );
    if (indexTrack == -1)
      throw new HttpException("Track doesn't exist", StatusCodes.NOT_FOUND);
    this.dataBase.tracks.splice(indexTrack, 1);
    return `Track id=${id} deleted`;
  }
}
