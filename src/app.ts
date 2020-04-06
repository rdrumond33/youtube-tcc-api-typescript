import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dbConfig from './setting/dbConfig'
import routes from './routes'

class App {
  public app: express.Application

  public constructor() {
    this.app = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares(): void {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(morgan('dev'))
    this.app.use(routes)
  }

  private database(): void {
    if (process.env.PRODUCTION == 'false') {
      mongoose.Promise = global.Promise
      mongoose.connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: dbConfig.user,
        pass: dbConfig.pwd
      }).then(() => {
        console.log('successfully connected to the database')
      }).catch(error => {
        console.log('error connecting to the database' + error)
        process.exit()
      })
    } else {
      mongoose.Promise = global.Promise
      mongoose.connect(`mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@databaseevent-njdd3.mongodb.net/test?retryWrites=true&w=majority`, {
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

  private routes(): void {
    this.app.get('/', (req, res) => {
      return res.send('ola')
    })
  }
}

export default new App().app
