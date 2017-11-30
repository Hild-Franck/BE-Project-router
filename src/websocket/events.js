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
      const player = players.get(username)
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
        player.keys.update(JSON.parse(msg.utf8Data))
        console.log(msg.utf8Data)
        console.log(player.keys)
      })
      wsConn.on('close', err => {
        console.log(`Connection lose for ${username}`)
        unregister(username).then(username => {
          const leaveMessage = {
            data: { id: players.get(username).id }
          }
          broadcastPlayer(wss, wsConn, 'leavingPlayer', leaveMessage)
          return username
        }).then(username => {
          console.log('Remove player: ', username)
          players.remove(username)
        })
      })
    }

  }
  return events
}

module.exports = createEvents