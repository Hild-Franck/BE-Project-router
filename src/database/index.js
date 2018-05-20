const init = require('./init')
const storeNewPlayer = require('./storeNewPlayer')
const config = require('../../config').redis

const database = {
	init: () => init(config).then(db => {
		database.storeNewPlayer = storeNewPlayer(db)
	}).catch(({ message }) => logger.error(message)),
	storeNewPlayer: () => {}
}

module.exports = database