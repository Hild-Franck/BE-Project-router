const database = require('./database')
const players = require('./players')
const logger = require('./logger')

const register = (request, authObj) =>
	database
		.then(db => db.auth(authObj))
		.then(player => {
			request.accept('echo-protocol')
			return player
		}).catch(e => {
			logger.warn(e.message)
			return request.reject(403, e.message)
		})

module.exports = register
