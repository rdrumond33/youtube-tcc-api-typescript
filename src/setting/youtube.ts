import axios from 'axios'
import Video from '../schemas/Channel'

async function normalizeData (videos: Array<any>, country: string): any {
  const now = new Date()

  const channels = {
    ids: [],
    country: country,
    timestamp: now
  }

  for (let i = 0; i < videos.length; i++) {
    channels.ids.push(videos[i].id)
    Video.create({
      idVideo: videos[i].id,
      rank: i + 1,
      channel: videos[i].snippet.channelTitle,
      title: videos[i].snippet.title,
      country: channels.country,
      description: videos[i].snippet.description,
      publishedAt: videos[i].snippet.publishedAt,
      viewCount: videos[i].statistics.viewCount,
      likeCount: videos[i].statistics.likeCount,
      dislikeCount: videos[i].statistics.dislikeCount,
      favoriteCount: videos[i].statistics.favoriteCount,
      commentCount: videos[i].statistics.commentCount,
      collectionAt: now
    })
  }

  return channels
}

export default async function getIds (country: string) {
  const responseData = []

  const responseAxios = await axios({
    method: 'get',
    url: '/videos',
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
      key: process.env.YOUTUBEKEY,
      part: 'id,snippet,statistics',
      chart: 'mostPopular',
      maxResults: '50',
      regionCode: `${country}`
    }
  })
  if (responseAxios.status >= 400) {
    console.error('Nao foi possivel pegar os ids dos videos')
  }
  const totalResults: number = parseInt(responseAxios.data.pageInfo.totalResults, 10)
  const resultsPerPage: number = parseInt(responseAxios.data.pageInfo.resultsPerPage, 10)
  const pageToken: string = responseAxios.data.nextPageToken

  responseData.push(...responseAxios.data.items)

  let response
  for (let i = 1; i < totalResults / resultsPerPage; i++) {
    if (i === 1) {
      response = await axios({
        method: 'get',
        url: '/videos',
        baseURL: 'https://www.googleapis.com/youtube/v3',
        params: {
          key: process.env.YOUTUBEKEY,
          part: 'id,snippet,statistics',
          chart: 'mostPopular',
          pageToken: `${pageToken}`,
          maxResults: '50',
          regionCode: `${country}`
        }
      })
      responseData.push(...response.data.items)
    } else {
      response = await axios({
        method: 'get',
        url: '/videos',
        baseURL: 'https://www.googleapis.com/youtube/v3',
        params: {
          key: process.env.YOUTUBEKEY,
          part: 'id,snippet,statistics',
          chart: 'mostPopular',
          maxResults: '50',
          pageToken: response.data.nextPageToken,
          regionCode: `${country}`
        }
      })
      responseData.push(...response.data.items)
    }
  }
  return await normalizeData(responseData, country)
}
