const ava = require('ava')

const register = require('../src/authenticate')

let player = {}

const mockRequest = {
	check: {
		accept: {},
		reject: {}
	}
}

mockRequest.accept = protocol => {
	mockRequest.check.accept = { protocol }
}

mockRequest.reject = (code, errMessage) => {
	mockRequest.check.reject = { code, errMessage }
}

mockRequest.on = (event, callback) => {
	if (event == "requestAccepted") {
		player = callback()
	}
}

const authObj = { username: "Poulet", id: "" }

const onRequestAccepted = (_, player) => {
	return player
}


ava.before(t => {
	return register(mockRequest, authObj, onRequestAccepted).then(() => {
		return register(mockRequest, authObj, onRequestAccepted)
	})
})

ava('request accepted for the first register', t => {
	t.is(mockRequest.check.accept.protocol, 'echo-protocol')
})

ava('request rejected for the second register', t => {
	t.is(mockRequest.check.reject.code, 403)
})

ava('player have right username', t => {
	t.is(player.username, "Poulet")
})