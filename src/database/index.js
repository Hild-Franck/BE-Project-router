const init = require('./init')
const storeNewPlayer = require('./storeNewPlayer')
const config = require('../../config').redis

const database = init(config).then(db => {
	return { storeNewPlayer: storeNewPlayer(db) }
})

module.exports = database