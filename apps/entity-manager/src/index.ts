import { Hono } from 'hono'
import tracks from './routes/tracks'
import { NewTrackWorkflow } from './workflows/new-track'
const app = new Hono<{ Bindings: CloudflareBindings }>()
  

app.route('/tracks', tracks)
export default app


export { NewTrackWorkflow };