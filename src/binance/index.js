const schedule = require('node-schedule')

const pricesGet = async () => {
  schedule.scheduleJob('*/5 * * * * *', async () => {
    console.log('call......')
  })
}

module.exports = {
  pricesGet
}