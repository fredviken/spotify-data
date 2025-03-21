import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent } from 'cloudflare:workers';
import { SpotifyClient } from '@spotify-data/spotify-client';


export class NewTrackWorkflow extends WorkflowEntrypoint<Env, Params> {
  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    // const trackId = event
    step.do('get track data', async () => {
      console.log(event);
      const token = await this.env.SPOTIFY_WEB_TOKEN.get('accessToken');
      if (!token) {
        throw new Error('No token found');
      }
      const client = new SpotifyClient(token);
      const track = await client.getTrack(this.ctx.props.id);
      console.log(track);
    });



  }
}