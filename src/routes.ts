import { Router } from 'express'
import ChannelsController from './controllers/ChannelsController'

const routes = Router()
routes.get('/tcc/ping', ChannelsController.ping)
routes.get('/tcc/channels', ChannelsController.index)
routes.get('/tcc/channels/:country', ChannelsController.create)

export default routes
