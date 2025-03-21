import { SupabaseClient } from "../types/supabase";
import { ITrackService } from "../types/services";
import { Track } from "../types/schema";

export class TrackService implements ITrackService {
	constructor(private readonly supabase: SupabaseClient) {}

	async getTrack(id: string) {
		const { data, error } = await this.supabase.from('tracks').select('*').eq('id', id).single();

		if (error) {	
			throw new Error(error.message);
		}

		return data;
	}

	async addTrack(spotifyId: string, name: string, coverImage: string): Promise<Track> {
		const { data, error } = await this.supabase.from('tracks').insert({
			spotify_id: spotifyId,
			name,
			cover_image: coverImage,
		}).select().single();

		if (error) {
			throw new Error(error.message);
		}

		return data;
	}
}