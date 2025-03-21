import { BaseResponse, Image, PlayabilityStatus } from "./common";
import { SpotifyArtist } from "./artist";

export type SpotifyTrack = {
  name: string;
  id: string;
  duration: {
    totalMilliseconds: number;
  };
  playcount: string;
  firstArtist: {
    items: SpotifyArtist[];
    totalCount: number;
  };
  otherArtists: {
    items: SpotifyArtist[];
    totalCount: number;
  };
  playability: PlayabilityStatus;
};

export type SpotifyTrackResponse = {
  data: {
    trackUnion: SpotifyTrack;
  }
}
