const onRequest = require('./onRequest')

const createEvents = wss => {
  const events = {
  	onRequest: onRequest(wss),
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