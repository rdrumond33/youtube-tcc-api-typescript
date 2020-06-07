import { Router } from 'express'
import ChannelsController from './controllers/ChannelsController'

const routes = Router()
routes.get('/tcc/channels/ping', ChannelsController.ping)
routes.get('/tcc/channels/count', ChannelsController.count)
routes.get('/tcc/channels', ChannelsController.index)
routes.get('/tcc/channels/:country', ChannelsController.create)
routes.get('/tcc/channels/search/:country', ChannelsController.show)
routes.get('/tcc/videos/desc', ChannelsController.orderDay)
routes.get('/tcc/videos/desc/:country', ChannelsController.orderDayPerContry)
routes.get('/tcc/videos/date/:date', ChannelsController.datePerContry)
routes.get('/tcc/videos/:id', ChannelsController.videId)

export default routes
