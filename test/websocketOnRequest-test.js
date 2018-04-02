const ava = require('ava')

const createOnRequest = require('../src/websocket/events/onRequest')

const wss = {}

const onRequest = createOnRequest(wss)

const check = {
	rejected: 0
}

const wrongRequest = {
	requestedProtocols: [ "cole-protocol" ],
	resourceURL: { query: '' },
	reject: () => {
		check.rejected++
	},
	on: type => {
		check.type = type
	}
}

const rightRequest = {
	requestedProtocols: [ "echo-protocol" ],
	resourceURL: { query: '' },
	reject: () => {
		check.rejected++
	},
	on: type => {
		check.type = type
	}
}

ava.before(t => {
	onRequest(wrongRequest)
	onRequest(rightRequest)
})

ava('only wrong request rejected', t => {
	t.is(check.rejected, 1)
})