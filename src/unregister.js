const database = require('./database')

const unregister = username =>
	database.then(db => db.removeUser(username))

module.exports = unregister