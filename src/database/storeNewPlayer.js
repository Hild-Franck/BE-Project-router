const consola = require('consola')

const logger = consola.withScope('db.storeNewPlayer')

const storeNewPlayer = db => playerData => {
	db.hmsetAsync(playerData.username,
		"id", playerData.id,
		"x", playerData.x,
		"y", playerData.y).then(data => {
		logger.success(`Player ${playerData.username} stored`)
	})
}

module.exports = storeNewPlayer