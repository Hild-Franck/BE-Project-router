const register = require('../register')
const unregister = require('../unregister')
const map = require('../mapGeneration')(10)
const players = require('../players')

const broadcastPlayer = (wss, wsc, type, { data }) => {
  wss.connections.forEach((ws, idx) => {
    if (ws !== wsc)
      ws.send(JSON.stringify({ type, data }))
  })
}

const message = JSON.stringify({
  type: 'map',
  data: map
})

const createEvents = wss => {
  const events = {
  	onRequest: request => {
      console.log('Request received')
  		const autObj = {
        username: request.resourceURL.query.username || '',
        id: ''
      }

  		if (!request.requestedProtocols.includes('echo-protocol')) {
        console.log(`[${autObj.username}] Wrong protocol, connection rejected`)
        request.reject()
        return undefined
      }

      request.on('requestAccepted', wsConn =>
        events.onRequestAccepted(wsConn, autObj))
        
      register(request, autObj)
    },
    onRequestAccepted: (wsConn, autObj) => {
      console.log(`Connection accepted for ${autObj.username}`)
      
      wsConn.send(message)
      const player = players.get(autObj.id)
      const playerMessage = {
        type: 'playerInit',
        data: { id: player.id, x: player.x, y: player.y }
      }
      wsConn.send(JSON.stringify(playerMessage))
      broadcastPlayer(wss, wsConn, 'newPlayer', playerMessage)

      wsConn.send(JSON.stringify({
        type: 'getPlayers',
        data: players.getAll()
      }))
      wsConn.on('message', msg => {
        player.keys.update(JSON.parse(msg.utf8Data), player)
        console.log('[DEBUG] Key data: ', player.keys)
      })
      wsConn.on('close', err => {
        console.log(`Connection lose for ${autObj.username}`)
        unregister(autObj.username).then(username => {
          const leaveMessage = {
            data: { id: player.id }
          }
          broadcastPlayer(wss, wsConn, 'leavingPlayer', leaveMessage)
          return username
        }).then(username => {
          console.log('Remove player: ', username)
          players.remove(autObj.id)
        })
      })
    }

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