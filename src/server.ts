import app from './app'
// import { startCron } from './cron/cronjob'
import './lib/env'
// startCron()

app.listen(process.env.PORT || 3333, () => {
  console.log('connect port' + process.env.PORT)
})
