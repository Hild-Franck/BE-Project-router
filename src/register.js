const database = require('./database')
const players = require('./players')

const register = (request, username) =>
	database
		.then(db => db.auth(username))
		.then(player => {
			console.log('[DEBUG] Player: ', player)
			request.accept('echo-protocol')
			return player
		})
		.catch(e => request.reject(403, e.message))

module.exports = register