const database = require('database')

const register = (request, username) =>
	database
		.then(db => db.auth(username))
		.then(() => request.accept())
		.catch(() => request.reject())
