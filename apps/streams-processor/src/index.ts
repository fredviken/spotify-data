import { type Tables } from '@repo/database'


export default {
	async scheduled(event, env, ctx): Promise<void> {
		// const test: Tables<'albums'> = {
		// 	id: '1',
		// 	name: 'test',
		// 	createdAt: new Date(),
		// 	updatedAt: new Date(),
		// }
		// console.log(test)
		const test: Tables<'albums'> = {
			id: '1',
			name: 'test',
			created_at: new Date().toISOString(),
			release_date: new Date().toISOString(),
			spotify_id: '1',
			type: 'ALBUM',
			cover_image: 'test',
		}
		console.log(test)
	},
} satisfies ExportedHandler<Env>;
