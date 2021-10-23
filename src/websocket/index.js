const { discordChangeMessage } = require('../discord')
const webSocket = require('ws')
const ticker = process.env.TICKER
const tickerDecimal = process.env.TICKER_DECIMAL

const binanceSocket = async () => {
  const ws = new webSocket('wss://stream.binance.com:9443/ws/!ticker@arr')

  ws.on('message', async (message) => {
    const data = JSON.parse(message.toString())
    const markets = {}

    const props = data.map(({ s: symbol, c: close, P: change24, ...reset }) => ({
      symbol,
      close,
      change24: change24.substring(0, change24.length - 1),
      ...reset
    }))

    props.forEach((e) => {
      markets[e.symbol] = e
    })

    if (ticker in markets) {
      const { close: price, change24 } = markets[ticker]

      const arrow = change24.includes('-') ? '↙' : '↗'
      const stringPrice = `$${Number(price).toFixed(tickerDecimal)}`
      const stringChange = `${arrow}${change24}%`

      await discordChangeMessage(`${stringPrice} ${stringChange}`)
    }
  })
}

module.exports = { binanceSocket }
