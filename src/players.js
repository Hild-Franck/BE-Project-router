const uuid = require('uuid/v4')
const createKeys = require('./keys')

const players = {
	collection: {}
}

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

players.add = player => players.collection[player.id] = player
players.remove = id => (delete players.collection[id])
players.get = id => players.collection[id]
players.getAll = () => players.collection
players.create = authObj => ({
	username: authObj.username,
	id: uuid(),
	keys: createKeys(),
	x: randomInt(10, 630),
	y: randomInt(10, 630)
})

module.exports = players