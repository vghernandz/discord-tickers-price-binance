const { discordChangeMessage } = require('../discord')
const schedule = require('node-schedule')
const axios = require('axios')
const ticker = process.env.TICKER
const tickerDecimal = process.env.TICKER_DECIMAL

const getPriceBinance = async () =>
  await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${ticker}`)

const setPriceBinance = async () => {
  const { data } = await getPriceBinance()

  const { lastPrice, priceChangePercent } = data

  const arrow = priceChangePercent.includes('-') ? '⬋' : '⬈'
  const stringPrice = `$${Number(lastPrice).toFixed(tickerDecimal)}`
  const stringChange = `${arrow}${priceChangePercent.replace('-', '').slice(0, -1)}%`

  return await discordChangeMessage(`${stringPrice} ${stringChange}`)
}

const pricePropageDiscord = async () => {
  await setPriceBinance()

  schedule.scheduleJob('*/5 * * * * *', async () => {
    return await setPriceBinance()
  })
}

module.exports = {
  pricePropageDiscord
}
