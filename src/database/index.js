const uuid = require('uuid/v4')

const init = require('./init')
const config = require('../../config').redis

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const database = init(config).then(db => {
	const auth = username => new Promise((resolve, reject) => {
		if (username === '')
			return reject(new Error('Empty username'))
		return db.hgetallAsync(username).then(usernameHash => {
			if (usernameHash !== null)
				return reject(new Error('Username already used'))
			const player = {
				username,
				id: uuid(),
				lastKey: '',
				x: randomInt(10, 630),
				y: randomInt(10, 630)
			}
			return db.hmsetAsync(player.username,
				'id', player.id,
				'lastKey', '',
				'x', player.x,
				'y', player.y)
				.then(res => resolve(player))
				.catch(reject)
		})
	})

	const removeUser = username => (db.delAsync(username), username)

	return { auth, removeUser }
})

module.exports = database