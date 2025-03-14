import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent } from 'cloudflare:workers';

type SpotifyResponse = {
	clientId: string;
	accessToken: string;
	accessTokenExpirationTimestampMs: number;
	isAnonymous: boolean;
	totpValidity: boolean;
};

export default {
	async scheduled(event, env, ctx): Promise<void> {
		// trigger workflow
		env.WEB_TOKEN_WORKFLOW.create();
	},
} satisfies ExportedHandler<Env>;

export class WebTokenWorkflow extends WorkflowEntrypoint<Env, Params> {
	async run(_: WorkflowEvent<Params>, step: WorkflowStep) {
		// fetch access token
		let accessToken = await step.do('fetch access token', async () => {
			console.log('fetching access token');
			const res = await fetch('https://open.spotify.com/get_access_token?reason=init&productType=web-player');
			if (!res.ok) throw new Error(`Failed to fetch access token: ${res.statusText}`);
			const data = (await res.json()) as SpotifyResponse;
			return data.accessToken;
		});

		// save access token
		await step.do('save access token', async () => {
			console.log('saving access token');
			await this.env.SPOTIFY_WEB_TOKEN.put('accessToken', accessToken);
		});
	}
}
