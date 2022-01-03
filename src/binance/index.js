const schedule = require('node-schedule')
const axios = require('axios')
const ticker = process.env.TICKER
const tickerDecimal = process.env.TICKER_DECIMAL

const pricesGet = async () => {
  schedule.scheduleJob('*/5 * * * * *', async () => {
    const {data} = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${ticker}`)

    const { lastPrice, priceChangePercent } = data 

      const arrow = priceChangePercent.includes('-') ? '⬋' : '⬈'
      const stringPrice = `$${Number(lastPrice).toFixed(tickerDecimal)}`
      const stringChange = `${arrow}${priceChangePercent}%`

      // await discordChangeMessage(`${stringPrice} ${stringChange}`)

    console.log({
      stringPrice,
      stringChange
    })
  })
}

module.exports = {
  pricesGet
}