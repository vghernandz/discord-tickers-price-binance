const express = require('express')
const app = express()
const { discordRunning } = require('./discord')
const { binanceSocket } = require('./websocket')

const PORT = process.env.PORT || 8080

app.get('/', (req, res) => res.send('watch ticker running....'))

app.listen(PORT, async () => {
  await discordRunning()
  binanceSocket()

  console.log(`run server on port ${PORT}`)
})
