const database = require('./database')
const players = require('./players')

const register = (request, username) =>
	database
		.then(db => db.auth(username))
		.then(player => (players.add(player), request.accept(), player))
		.catch(e => request.reject(403, e.message))

module.exports = register