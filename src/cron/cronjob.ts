import { CronJob } from 'cron'
import axios from 'axios'

async function createIds (country) {
  try {
    const result = await axios({
      url: `/channels/${country}`,
      method: 'get',
      baseURL: 'https://youtube-api-tcc.herokuapp.com/tcc/',
      auth: {
        username: process.env.BASEAUTHUSERNAME,
        password: process.env.BASEAUTHPASSWORD
      }
    })

    if (result.status >= 200 && result.status < 300) {
      console.log(`Terminou[${new Date()}]pais ${result.data.country} `)
    }
    return result
  } catch (error) {
    console.error(error)
  }
}

export function startCron (): void {
  console.log('start cron job')
  const job = new CronJob(process.env.CRONTAB, () => {
    console.log(`Iniciando CronJob data:${new Date()}`)
    const countrys = `${process.env.COUNTYS}`.toUpperCase().trim().split(',')
    countrys.forEach(country => {
      createIds(country)
    })
  }, null, true, 'America/Sao_Paulo')
  job.start()
}
