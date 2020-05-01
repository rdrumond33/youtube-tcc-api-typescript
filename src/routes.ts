import { Router } from 'express'
import ChannelsController from './controllers/ChannelsController'

const routes = Router()
routes.get('/tcc/channels/ping', ChannelsController.ping)
routes.get('/tcc/channels/count', ChannelsController.count)
routes.get('/tcc/channels', ChannelsController.index)
routes.get('/tcc/channels/:country', ChannelsController.create)
routes.get('/tcc/channels/search/:country', ChannelsController.show)
routes.get('/tcc/videos/asc', ChannelsController.orderDay)
routes.get('/tcc/videos/asc/:country', ChannelsController.orderDayPerContry)

export default routes
