const ava = require('ava')

const register = require('../src/register')

const mockRequest = {
	check: {
		accept: {},
		reject: {},
	}
}

mockRequest.accept = protocol => {
	mockRequest.check.accept = { protocol }
}

mockRequest.reject = (code, errMessage) => {
	mockRequest.check.reject = { code, errMessage }
}

const authObj = { username: 'Poulet', id: "" }

let player = {}

ava.before(t => {
	return register(mockRequest, authObj).then(newPlayer => {
		player = newPlayer
		return register(mockRequest, authObj)
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