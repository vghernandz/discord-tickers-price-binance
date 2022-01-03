const express = require('express')
const app = express()
const { pricePropageDiscord } = require('./binance')
const { discordRunning } = require('./discord')

const PORT = process.env.PORT || 8080

app.get('/', (req, res) => res.send('watch ticker running....'))

app.listen(PORT, async () => {
  await discordRunning()
  pricePropageDiscord()

  console.log(`run server on port ${PORT}`)
})
