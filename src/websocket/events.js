const register = require('../register')
const unregister = require('../unregister')
const map = require('../mapGeneration')(10)

const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const broadcastPlayer = (wss, wsc, { data }) => {
  wss.connections.forEach((ws, idx) => {
    if (ws !== wsc)
      ws.send(JSON.stringify({ type: 'newPlayer', data }))
  })
}

const message = JSON.stringify({
  type: 'map',
  data: map
})

const playerInit = () => ({
  type: 'playerInit',
  data: { x: randomInt(10, 630), y: randomInt(10, 630) }
})

const createEvents = wss => {
  const events = {
  	onRequest: request => {
      console.log('Request received')
  		const username = request.resourceURL.query.username || ''

  		if (!request.requestedProtocols.includes('echo-protocol')) {
        console.log(`[${username}] Wrong protocol, connection rejected`)
        request.reject()
        return undefined
      }

      request.on('requestAccepted', wsConn =>
        events.onRequestAccepted(wsConn, username))
        
        register(request, username)
    },
    onRequestAccepted: (wsConn, username) => {
      console.log(`Connection accepted for ${username}`)
      
      wsConn.send(message)

      const playerMessage = playerInit()
      broadcastPlayer(wss, wsConn, playerMessage)

      wsConn.send(JSON.stringify(playerMessage))
      wsConn.on('close', err => {
        console.log(`Connection lose for ${username}`)
        unregister(username)
      })
    }

  }
  return events
}

module.exports = createEvents