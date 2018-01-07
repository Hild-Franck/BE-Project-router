const players = require('../../players')
const map = require('../../mapGeneration')(10)
const unregister = require('../../unregister')

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

const onRequestAccepted = wss => (wsConn, autObj) => {
  console.log(`Connection accepted for ${autObj.username}`)
  
  wsConn.send(message)
  const player = players.get(autObj.id)

  const playerMessage = {
    type: 'playerInit',
    data: { id: player.id, x: player.x, y: player.y }
  }

  wsConn.send(JSON.stringify(playerMessage))
  broadcastPlayer(wss, wsConn, 'newPlayer', playerMessage)

  wsConn.send(JSON.stringify({ type: 'getPlayers', data: players.getAll()}))
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

module.exports = onRequestAccepted