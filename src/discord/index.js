const { Client, Intents } = require('discord.js')
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] })

const discordRunning = async () => {
  await bot.login(process.env.TOKEN_DISCORD)

  await discordChangeMessage('load..')
}

const discordChangeMessage = async (message) => {
  bot.user.setActivity(message, {
    type: 'WATCHING'
  })
}

module.exports = {
  discordRunning,
  discordChangeMessage
}
