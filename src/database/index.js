const uuid = require('uuid/v4')

const init = require('./init')
const config = require('../../config').redis
const players = require('../players')
const createKeys = require('../keys')

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const database = init(config).then(db => {
	const auth = autObj => new Promise((resolve, reject) => {
		if (autObj.username === '')
			return reject(new Error('Empty username'))
		return db.hgetallAsync(autObj.username).then(usernameHash => {
			if (usernameHash && players.get(usernameHash.id))
				return reject(new Error('Username already used'))
			if (usernameHash !== null) {
				usernameHash.keys = createKeys()
				usernameHash.x = Number(usernameHash.x)
				usernameHash.y = Number(usernameHash.y)
				autObj.id = usernameHash.id
				players.add(usernameHash)
				return resolve(usernameHash)
			}
			const player = {
				username: autObj.username,
				id: uuid(),
				keys: createKeys(),
				x: randomInt(10, 630),
				y: randomInt(10, 630)
			}
			autObj.id = player.id
			players.add(player)
			return db.hmsetAsync(player.username,
				'username', autObj.username,
				'id', player.id,
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