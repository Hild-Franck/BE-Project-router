const consola = require('consola')
const init = require('./init')
const storeNewPlayer = require('./storeNewPlayer')
const config = require('../../config').redis

const logger = consola.withScope('db')

const database = {
	init: () => init(config).then(db => {
		logger.success("Database initialized")
		database.storeNewPlayer = storeNewPlayer(db)
	}).catch(({ message }) => logger.error(message)),
	storeNewPlayer: () => {}
}

module.exports = database