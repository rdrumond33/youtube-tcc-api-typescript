import { Request, Response, NextFunction } from 'express'
import Channel from '../schemas/Channel'
import { getIds, normalizeData } from '../setting/youtube'
class ChannelController {
  public async index (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const Channels = await Channel.find()
    return res.json(Channels)
  }

  public async ping (req: Request, res: Response): Promise<Response> {
    return res.json('Pong')
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const country = req.params.country

    const data = await getIds(country)
    const dataNormalize = await normalizeData(data, country)
    return res.json(dataNormalize)
  }
}

export default new ChannelController()
