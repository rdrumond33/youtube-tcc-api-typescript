import axios from 'axios'
import Channel from '../schemas/Channel'

async function getIds (country: string): Promise<Array<any>> {
  const responseData = []

  const responseAxios = await axios({
    method: 'get',
    url: '/videos',
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
      key: process.env.YOUTUBEKEY,
      part: 'snippet',
      chart: 'mostPopular',
      maxResults: '50',
      regionCode: `${country}`
    }
  })
  const totalResults: number = parseInt(responseAxios.data.pageInfo.totalResults, 10)
  const resultsPerPage: number = parseInt(responseAxios.data.pageInfo.resultsPerPage, 10)
  const pageToken: string = responseAxios.data.nextPageToken

  responseData.push(responseAxios.data)

  let response
  for (let i = 1; i < totalResults / resultsPerPage; i++) {
    if (i === 1) {
      response = await axios({
        method: 'get',
        url: '/videos',
        baseURL: 'https://www.googleapis.com/youtube/v3',
        params: {
          key: process.env.YOUTUBEKEY,
          part: 'snippet',
          chart: 'mostPopular',
          pageToken: `${pageToken}`,
          maxResults: '50',
          regionCode: `${country}`
        }
      })
      responseData.push(response.data)
    } else {
      response = await axios({
        method: 'get',
        url: '/videos',
        baseURL: 'https://www.googleapis.com/youtube/v3',
        params: {
          key: process.env.YOUTUBEKEY,
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: '50',
          pageToken: response.data.nextPageToken,
          regionCode: `${country}`
        }
      })
      responseData.push(response.data)
    }
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
    playlist.items.map(video => {
      channels.ids.push(video.id)
      Channel.findOne({ idVideo: video.id, country: country }).exec((_, res) => {
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
      })
    })
  })

  return channels
}

export { getIds, normalizeData }
