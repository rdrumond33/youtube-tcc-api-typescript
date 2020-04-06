import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'

import routes from './routes'

class App {
    public app: express.Application

    public constructor () {
      this.app = express()
      this.middlewares()
      this.database()
      this.routes()
    }

    private middlewares (): void{
      this.app.use(express.json())
      this.app.use(cors())
      this.app.use(morgan('dev'))
      this.app.use(routes)
    }

    private database (): void{
      mongoose.connect('mongodb://localhost:27017/testeY', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    }

    private routes (): void{
      this.app.get('/', (req, res) => {
        return res.send('ola')
      })
    }
}

export default new App().app
