const onRequest = require('./onRequest')

const createEvents = wss => {
  const events = {
  	onRequest: onRequest(wss)
  }
  const type = 'update'
  setInterval(() => {
    wss.connections.forEach((ws, idx) => {
      ws.send(JSON.stringify({ type, data: players.getAll() }))
  })
  }, 16)
  return events
}

module.exports = createEvents