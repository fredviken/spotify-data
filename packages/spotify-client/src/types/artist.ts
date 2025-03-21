import { Image } from './common';

export type SpotifyArtist = {
  id: string;
  profile: {
    name: string;
  }
  visuals: {
    avatarImage: Image[];
  }
} 

export type SpotifyArtistResponse = {
  data: {
    artistUnion: SpotifyArtist;
  }
}