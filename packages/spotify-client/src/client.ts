import { SpotifyArtistResponse } from "./types/artist";
import { ISpotifyClient } from "./types/client";
import { SpotifyTrackResponse } from "./types/track";

export class SpotifyClient implements ISpotifyClient {
  constructor(private readonly token: string) {}

  async getTrack(id: string): Promise<SpotifyTrackResponse> {
    const response = await fetch(
      `https://api-partner.spotify.com/pathfinder/v1/query?operationName=getTrack&variables={"uri":"spotify:track:${id}"}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch track ${id}`);
    }
    const data = await response.json();

    return data as SpotifyTrackResponse;
  }

  // async getArtist(id: string): Promise<SpotifyArtistResponse> {
  //   // TODO: Implement
  // }
}
