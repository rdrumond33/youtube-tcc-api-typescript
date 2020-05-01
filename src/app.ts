import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import routes from './routes'
import helmet from 'helmet'
import './lib/env'

class App {
  public app: express.Application

  public constructor () {
    this.app = express()
    this.middlewares()
    this.database()
  }

  private middlewares (): void {
    this.app.use(express.json())
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(morgan('dev'))
    this.app.use(this.basicAuth)
    this.app.use(routes)
  }

  private database (): void {
    if (process.env.PRODUCTION === 'dev') {
      console.log('Modo[dev]')
      mongoose.connect(`mongodb://localhost:27017/${process.env.MONGONAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('successfully connected to the database dev')
      }).catch(error => {
        console.log('error connecting to the database' + error)
        process.exit()
      })
    } else {
      console.log('Modo[production]')
      mongoose.connect(`mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@databaseevent-njdd3.mongodb.net/${process.env.MONGONAME}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('successfully connected to the database production')
      }).catch(error => {
        console.log('error connecting to the database' + error)
        process.exit()
      })
    }
  }

  private basicAuth (req, res, next): void {
    if (req.headers.authorization && req.headers.authorization.search('Basic ') === 0) {
      // fetch login and password
      if (Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString() === `${process.env.BASEAUTHUSERNAME}:${process.env.BASEAUTHPASSWORD}`) {
        next()
        return
      }
    }
    console.log('Unable to authenticate user')
    console.log(req.headers.authorization)
    res.header('WWW-Authenticate', 'Basic realm="Admin Area"')
    if (req.headers.authorization) {
      setTimeout(function () {
        res.send('Authentication required', 401)
      }, 1000)
    } else {
      res.send('Authentication required', 401)
    }
  }
}

export default new App().app
