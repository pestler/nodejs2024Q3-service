import { Albums } from 'src/src/albums/interfaces/albums.interfaces';
import { Artists } from 'src/src/artists/interfaces/artists.interfaces';
import { TracksController } from 'src/src/tracks/tracks.controller';

export interface Favorites {
  artists: Artists[]; // favorite artists ids
  albums: Albums[]; // favorite albums ids
  tracks: TracksController[]; // favorite tracks ids
}
