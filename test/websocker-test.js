const ava = require('ava')

const createWebSocketServer = require('../src/websocket')

const check = {}

const WebSocketMock = function() {
	this.on = type => {
		check.event = type
	}
	this.connections = []
}

const websocketServer = createWebSocketServer(WebSocketMock)

ava('set onRequest event', t => {
	t.is(check.event, 'request')
})