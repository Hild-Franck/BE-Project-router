const players = require('../../players')
const map = require('../../mapGeneration')(10)
const logger = require('../../logger')

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

const onRequestAccepted = wss => (wsConn, playerData) => {
	logger.info(`Connection accepted for ${playerData.username}`)
	
	wsConn.send(message)

	const player = playerData.id ? playerData : players.create(playerData)
	players.add(player)

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
		logger.info(`Connection lose for ${playerData.username}`)
		const leaveMessage = {
			data: { id: player.id }
		}
		broadcastPlayer(wss, wsConn, 'leavingPlayer', leaveMessage)
		players.remove(player.id)
	})
}

module.exports = onRequestAccepted
