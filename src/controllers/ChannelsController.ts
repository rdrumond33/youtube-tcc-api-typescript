import { Request, Response } from 'express'
import Channel from '../schemas/Channel'
import axios from 'axios'

async function getIds (config: {}, country: string): Promise<Array<any>> {
  const responseData = []

  const responseAxios = await axios(config)
  const totalResults: number = parseInt(responseAxios.data.pageInfo.totalResults, 10)
  const resultsPerPage: number = parseInt(responseAxios.data.pageInfo.resultsPerPage, 10)
  const pageToken: string = responseAxios.data.nextPageToken

  responseData.push(responseAxios.data)

  config = {
    method: 'get',
    url: '/videos',
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
      key: 'AIzaSyDxWEiVZ2Ck1dP5qHW1MzCcvjrZ1l0R9uI',
      part: 'snippet',
      chart: 'mostPopular',
      pageToken: `${pageToken}`,
      maxResults: '50',
      regionCode: `${country}`
    }
  }

  for (let index = 1; index < totalResults / resultsPerPage; index++) {
    const response = await axios(config)
    config = {
      method: 'get',
      url: '/videos',
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: {
        key: 'AIzaSyDxWEiVZ2Ck1dP5qHW1MzCcvjrZ1l0R9uI',
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: '50',
        pageToken: response.data.nextPageToken,
        regionCode: `${country}`
      }
    }
    responseData.push(response.data)
  }
  return responseData
}

async function normalizeData (data, country: string): Promise<any> {
  const channels = {
    ids: [],
    country: country,
    timestamp: Date.now().toLocaleString('BR')
  }
  await data.map(playlist => {
    return playlist.items.map(video => {
      channels.ids.push(video.id)
      Channel.findOne({ idVideo: video.id }).exec((_, res) => {
        if (res == null) {
          Channel.create({
            idVideo: video.id,
            channel: video.snippet.channelTitle,
            title: video.snippet.title,
            country: channels.country,
            description: video.snippet.description,
            publishedAt: video.snippet.publishedAt
          })
        }
        return channels
      })
    })
  })
  console.log(channels.ids)
  return channels
}

class ChannelController {
  /**
  * index
  */
  public async index (req: Request, res: Response): Promise<Response> {
    const Channels = await Channel.find()
    return res.json(Channels)
  }

  /**
   * create
   */
  public async create (req: Request, res: Response): Promise<Response> {
    const country = req.params.country

    const data = await getIds({
      method: 'get',
      url: '/videos',
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: {
        key: 'AIzaSyDxWEiVZ2Ck1dP5qHW1MzCcvjrZ1l0R9uI',
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: '50',
        regionCode: `${country}`
      }
    }, country)
    const dataNormalize = await normalizeData(data, country)
    return res.json(dataNormalize)
  }
}

export default new ChannelController()
