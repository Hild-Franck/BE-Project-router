const init = require('./init')
const config = require('../../config').redis
const players = require('../players')
const createKeys = require('../keys')

const setUsernameHash = usernameHash => {
	usernameHash.keys = createKeys()
	usernameHash.x = Number(usernameHash.x)
	usernameHash.y = Number(usernameHash.y)
	players.add(usernameHash)
}

const auth = db => authObj => new Promise((resolve, reject) => {
	if (!authObj || authObj.username === '')
		return reject(new Error('Empty username'))
	return db.hgetallAsync(authObj.username).then(usernameHash => {
		if (usernameHash && players.get(usernameHash.id))
			return reject(new Error(`Username <${authObj.username}> already used`))
		if (usernameHash !== null) {
			setUsernameHash(usernameHash)
			authObj.id = usernameHash.id
			return resolve(usernameHash)
		}

		const player = players.create(authObj)
		players.add(player)

		authObj.id = player.id
		return db.hmsetAsync(player.username,
			'username', authObj.username,
			'id', player.id,
			'x', player.x,
			'y', player.y)
			.then(res => resolve(player))
			.catch(reject)
	})
})

const database = init(config).then(db => {
	

	return { auth: auth(db) }
})

module.exports = database