const database = require('./database')

const register = (request, username) =>
	database
		.then(db => db.auth(username))
		.then(() => request.accept())
		.catch(e => request.reject(403, e.message))

module.exports = register