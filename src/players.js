const players = {
	collection: {}
}

players.add = player => players.collection[player.username] = player
players.remove = username => (delete players.collection[username])
players.get = username => players.collection[username]
players.getAll = () => players.collection

module.exports = players