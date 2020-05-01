import { Request, Response } from 'express'
import Channel from '../schemas/Channel'
import getIds from '../setting/youtube'
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
    return res.json(data)
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

  public async orderDay (req: Request, res: Response): Promise<Response> {
    const result = await Channel.find({
      createdAt: {
        $lt: new Date(),
        $gte: new Date(new Date().setDate(new Date().getDate() - 1))
      }
    })
    if (result.length === 0) {
      return res.json({ result: 'Nao tem dado para esse dia' })
    }

    const resultOrder = result.sort((a, b): number => {
      if (parseInt(a.viewCount) < parseInt(b.viewCount)) return 1
      if (parseInt(b.viewCount) < parseInt(a.viewCount)) return -1
      return 0
    })

    return res.json({ resultOrder })
  }

  public async orderDayPerContry (req: Request, res: Response): Promise<Response> {
    const country = req.params.country.toUpperCase()

    const result = await Channel.find({
      country: country,
      createdAt: {
        $lt: new Date(),
        $gte: new Date(new Date().setDate(new Date().getDate() - 1))
      }
    })

    if (result.length === 0) {
      return res.json({ result: 'Nao tem dado para esse dia' })
    }

    const resultOrder = result.sort((a, b): number => {
      if (parseInt(a.viewCount) < parseInt(b.viewCount)) return 1
      if (parseInt(b.viewCount) < parseInt(a.viewCount)) return -1
      return 0
    })

    return res.json({ resultOrder })
  }
}
export default new ChannelController()
