const init = require('./init')
const config = require('../../config').redis

const database = init(config).then(db => {
	const auth = username => new Promise((resolve, reject) => {
		if (username === '')
			return reject(new Error('Empty username'))
		return db.hgetallAsync(username).then(usernameHash => {
			if (usernameHash !== null)
				return reject(new Error('Username already used'))
			return db.hmsetAsync(username, 'lastKey', '', 'x', 50, 'y', 50)
				.then(resolve)
				.catch(reject)
		})
	})

	const removeUser = username => db.delAsync(username)

	return { auth, removeUser }
})

module.exports = database