import app from './app'
import './lib/env'

app.listen(process.env.PORT || 3333, () => {
  console.log('connect port' + process.env.PORT)
})
