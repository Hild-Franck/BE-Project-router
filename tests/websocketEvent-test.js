const ava = require('ava')

const { wss, wsConn, authObj } = require('./websocketMock')
const players = require('../src/players')
const onRequestAccepted = require('../src/websocket/events/onRequestAccepted')

ava.before(t => {
	players.collection["1a"] = { id: "1a", x: 42, y: 24 }
	onRequestAccepted(wss)(wsConn, authObj)
})

ava('send 4 messages', t => {
	t.is(wsConn.check.sendNumber, 4)
})