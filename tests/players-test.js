const ava = require('ava')

const players = require('../src/players')

const player = { id: "iAmID" }
const authObj = { username: 'Jesus' }

ava.serial('add player', t => {
	players.add(player)
	t.is(players.collection[player.id].id, player.id)
})

ava.serial('get player', t => {
	const myPlayer = players.get(player.id)
	t.is(myPlayer.id, player.id)
})

ava.serial('get all players', t => {
	const collection = players.getAll()
	t.is(collection[player.id].id, player.id)
})

ava.serial('remove player', t => {
	players.remove(player.id)
	t.is(Object.keys(players.collection).length, 0)
})

ava.serial('create player', t => {
	const myPlayer = players.create(authObj)
	t.is(myPlayer.username, "Jesus")
})
