import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent } from 'cloudflare:workers';

export default {
	async scheduled(event, env, ctx): Promise<void> {
		const res = await fetch('https://open.spotify.com/get_access_token?reason=init&productType=web-player');

		const data = await res.json();

		// const accessToken = data.accessToken;


	},
} satisfies ExportedHandler<Env>;

