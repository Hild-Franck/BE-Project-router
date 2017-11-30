const players = {
	collection: {}
}

players.add = player => players.collection[player.id] = player
players.remove = id => (delete players.collection[id])
players.get = id => players.collection[id]
players.getAll = () => players.collection

module.exports = players