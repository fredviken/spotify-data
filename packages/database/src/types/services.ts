import { Track } from "./schema";


export interface ITrackService {
  getTrack(id: string): Promise<Track>;
  addTrack(spotifyId: string, name: string, coverImage: string): Promise<Track>;
}
