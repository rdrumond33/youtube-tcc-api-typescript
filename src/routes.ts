import { Router } from 'express'
import ChannelsController from './controllers/ChannelsController'

const routes = Router()
routes.get('/tcc/ping', ChannelsController.ping)
routes.get('/tcc/channels/count', ChannelsController.count)
routes.get('/tcc/channels', ChannelsController.index)
routes.get('/tcc/channels/:country', ChannelsController.create)
routes.get('/tcc/channels/search/:country', ChannelsController.show)
export default routes
