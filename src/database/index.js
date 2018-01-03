const init = require('./init')
const config = require('../../config').redis
const players = require('../players')
const createKeys = require('../keys')

const database = init(config).then(db => {
	const auth = authObj => new Promise((resolve, reject) => {
		if (!authObj || authObj.username === '')
			return reject(new Error('Empty username'))
		return db.hgetallAsync(authObj.username).then(usernameHash => {
			if (usernameHash && players.get(usernameHash.id))
				return reject(new Error('Username already used'))
			if (usernameHash !== null) {
				usernameHash.keys = createKeys()
				usernameHash.x = Number(usernameHash.x)
				usernameHash.y = Number(usernameHash.y)
				authObj.id = usernameHash.id
				players.add(usernameHash)
				return resolve(usernameHash)
			}

			const player = players.create(authObj)

			players.add(player)

			return db.hmsetAsync(player.username,
				'username', authObj.username,
				'id', player.id,
				'x', player.x,
				'y', player.y)
				.then(res => resolve(player))
				.catch(reject)
		})
	})

	return { auth }
})

module.exports = database