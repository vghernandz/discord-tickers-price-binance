const schedule = require('node-schedule')
const axios = require('axios')
const ticker = process.env.TICKER

const pricesGet = async () => {
  schedule.scheduleJob('*/5 * * * * *', async () => {
    const {data} = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${ticker}`)

    console.log(data)
  })
}

module.exports = {
  pricesGet
}