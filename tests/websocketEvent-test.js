const ava = require('ava')

const { wss, wsConn, authObj } = require('./websocketMock')
const players = require('../src/players')
const onRequestAccepted = require('../src/websocket/events/onRequestAccepted')

ava.before(t => {
	players.collection["1a"] = { id: "1a", x: 42, y: 24, keys: {
		update: () => {}
	} }
	onRequestAccepted(wss)(wsConn, authObj)
})

ava('send 5 messages', t => {
	t.is(wsConn.check.sendNumber, 5)
})

ava('send map as first message', t => {
	t.is(wsConn.check.firstMessage, "map")
})

ava('send playerInit as second message', t => {
	t.is(wsConn.check.secondMessage, "playerInit")
})

ava('send newPlayer as third message', t => {
	t.is(wsConn.check.thirdMessage, "newPlayer")
})

ava('send getPlayers as fourth message', t => {
	t.is(wsConn.check.fourthMessage, "getPlayers")
})

ava('send leavingPlayer as fifth message', t => {
	t.is(wsConn.check.fifthMessage, "leavingPlayer")
})

