const uuid = require('uuid/v4')

const init = require('./init')
const config = require('../../config').redis
const players = require('../players')

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const database = init(config).then(db => {
	const auth = username => new Promise((resolve, reject) => {
		if (username === '')
			return reject(new Error('Empty username'))
		return db.hgetallAsync(username).then(usernameHash => {
			if (players.get(username))
				return reject(new Error('Username already used'))
			if (usernameHash !== null) {
				players.add(usernameHash)
				return resolve(usernameHash)
			}
			const player = {
				username,
				id: uuid(),
				lastKey: '',
				x: randomInt(10, 630),
				y: randomInt(10, 630)
			}
			players.add(player)
			return db.hmsetAsync(player.username,
				'username', username,
				'id', player.id,
				'lastKey', '',
				'x', player.x,
				'y', player.y)
				.then(res => resolve(player))
				.catch(reject)
		})
	}).catch(console.log)

	const removeUser = username => username

	return { auth, removeUser }
})

module.exports = database