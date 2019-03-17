const consola = require('consola')
const init = require('./init')
const storeNewPlayer = require('./storeNewPlayer')
const dbConfig = require('../configs')

const logger = consola.withScope('db')

const database = {
	init: () => init(dbConfig).then(db => {
		logger.success("Database initialized")
		database.storeNewPlayer = storeNewPlayer(db)
	}).catch(({ message }) => logger.error(message)),
	storeNewPlayer: () => {}
}

module.exports = database