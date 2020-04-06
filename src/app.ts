import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import routes from './routes'

class App {
  public app: express.Application

  public constructor() {
    this.app = express()
    this.middlewares()
     this.database()
  }

  private middlewares(): void {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(morgan('dev'))
    this.app.use(routes)
  }

  private async database() {
    if (process.env.PRODUCTION == 'false') {
      console.log(`Modo[dev]`)
      mongoose.connect("mongodb://mongo:27017/youtubeIds", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('successfully connected to the database')
      }).catch(error => {
        console.log('error connecting to the database' + error)
        process.exit()
      })
    } else {
      console.log(`Modo[production]`)
      mongoose.connect(`mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@databaseevent-njdd3.mongodb.net/youtubeIds?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(() => {
        console.log('successfully connected to the database')
      }).catch(error => {
        console.log('error connecting to the database' + error)
        process.exit()
      })
    }
  }

}

export default new App().app
