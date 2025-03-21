import { SpotifyArtistResponse } from "./artist";
import { SpotifyTrackResponse } from "./track";

export interface ISpotifyClient {
  getTrack(id: string): Promise<SpotifyTrackResponse>;
  // getArtist(id: string): Promise<SpotifyArtistResponse>;  
}