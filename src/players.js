const uuid = require('uuid/v4')

const createKeys = require('./keys')
const database = require('./database')

const players = {
	collection: {}
}

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

players.add = ({ x, y, id, username }) => {
	const player = {
		x: Number(x),
		y: Number(y),
		id,
		username,
		keys: createKeys()
	}
	players.collection[id] = player
	return player
}
players.remove = id => (delete players.collection[id])
players.get = id => players.collection[id]
players.getAll = () => players.collection
players.create = playerData => {
	const player = {
		username: playerData.username,
		id: uuid(),
		keys: createKeys(),
		x: randomInt(10, 630),
		y: randomInt(10, 630)
	}
	database.then(db => db.storeNewPlayer(player))
	players.collection[player.id] = player
	return player
}

module.exports = players