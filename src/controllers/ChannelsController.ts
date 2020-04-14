import { Request, Response } from 'express'
import Channel from '../schemas/Channel'
import { getIds, normalizeData } from '../setting/youtube'
class ChannelController {
  public async index (req: Request, res: Response): Promise<Response> {
    const Channels = await Channel.find()
    return res.json(Channels)
  }

  public async ping (req: Request, res: Response): Promise<Response> {
    return res.json('Pong')
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const country = req.params.country.toUpperCase()

    const data = await getIds(country)
    const dataNormalize = await normalizeData(data, country)
    return res.json(dataNormalize)
  }

  public async show (req: Request, res: Response): Promise<Response> {
    const country = req.params.country.toUpperCase()

    const Channels = await Channel.find({ country: country })

    return res.json(Channels)
  }

  public async count (req: Request, res: Response): Promise<Response> {
    const count = await Channel.aggregate([
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 }
        }
      }
    ])

    return res.json({ count })
  }
}

export default new ChannelController()
