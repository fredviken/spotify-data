import puppeteer from '@cloudflare/puppeteer';

type SpotifyResponse = {
	clientId: string;
	accessToken: string;
	accessTokenExpirationTimestampMs: number;
	isAnonymous: boolean;
	totpValidity: boolean;
};

export default {
	async scheduled(request, env, ctx): Promise<void> {
		console.log('triggering workflow');
		const browser = await puppeteer.launch(env.MYBROWSER);
		const page = await browser.newPage();
		await page.goto('https://open.spotify.com/album/21jF5jlMtzo94wbxmJ18aa');

		try {
			const accessToken = await new Promise<SpotifyResponse>((resolve, reject) => {
				const timeout = setTimeout(() => {
					reject(new Error('Timeout waiting for access token'));
				}, 15000);

				page.on('response', async (response) => {
					console.log('response', response.url());
					const url = response.url();
					if (url.includes('get_access_token')) {
						const data = await response.json();
						console.log('found access token', data);
						clearTimeout(timeout);
						resolve(data);
					}
				});
			});

			console.log('saving access token', accessToken);
			await env.SPOTIFY_WEB_TOKEN.put('accessToken', accessToken.accessToken);
			await env.SPOTIFY_WEB_TOKEN.put('accessTokenExpirationTimestampMs', accessToken.accessTokenExpirationTimestampMs.toString());

		} catch (error) {
			console.error('error', error);
		} finally {
			console.log('closing browser');
			await browser.close();
		}

	},
} satisfies ExportedHandler<Env>;

// export class WebTokenWorkflow extends WorkflowEntrypoint<Env, Params> {
// 	async run(_: WorkflowEvent<Params>, step: WorkflowStep) {
// 		console.log('running workflow');
// 		// fetch access token
// 		let accessToken = await step.do('fetch access token', async () => {
// 			console.log('launching browser');
// 			const browser = await puppeteer.launch(this.env.MYBROWSER);
// 			const page = await browser.newPage();
// 			await page.goto('https://open.spotify.com/album/21jF5jlMtzo94wbxmJ18a', { waitUntil: 'load' });

// 			await page.reload();

// 			let accessToken = null;
// 			page.on('response', async (response) => {
// 				const url = response.url();
// 				if (url.includes('get_access_token')) {
// 					const data = await response.json();
// 					console.log('found access token', data);
// 					accessToken = data.accessToken;
// 				}
// 			});
// 			console.log('closing browser');
// 			await browser.close();

// 			return accessToken;
// 			// console.log('fetching access token');
// 			// const res = await fetch('https://open.spotify.com/get_access_token?reason=init&productType=web-player');
// 			// if (!res.ok) throw new Error(`Failed to fetch access token: ${res.statusText}`);
// 			// const data = (await res.json()) as SpotifyResponse;
// 			// return data.accessToken;
// 		});

// 		// save access token
// 		await step.do('save access token', async () => {
// 			console.log('saving access token', accessToken);
// 			// await this.env.SPOTIFY_WEB_TOKEN.put('accessToken', accessToken);
// 		});
// 	}
// }
