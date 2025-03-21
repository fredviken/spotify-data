import { Tables } from "./database";

export type Track = Tables<'tracks'>;
export type Album = Tables<'albums'>;
export type Artist = Tables<'artists'>;

export type AlbumArtist = Tables<'album_artists'>;
export type AlbumTrack = Tables<'album_tracks'>;
export type TrackArtist = Tables<'track_artists'>;
export type StreamCount = Tables<'stream_counts'>;


