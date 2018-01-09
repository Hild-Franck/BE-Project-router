const database = require('./database')
const players = require('./players')

const register = (request, authObj) =>
	database
		.then(db => db.auth(authObj))
		.then(player => {
			request.accept('echo-protocol')
			return player
		})
		.catch(e => request.reject(403, e.message))

module.exports = register
