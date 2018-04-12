const request = require('request-promise')
const logger = require('./logger')

const authService = process.env.AUTH || "localhost"

const register = (req, authObj, onRequestAccepted) => request({
	uri: `http://${authService}:4242/auth`,
	method: "POST",
	body: authObj,
	json: true
}).then(({ validation, message, playerData }) => {
	if (validation === true) {
		req.on('requestAccepted', wsConn => onRequestAccepted(wsConn, playerData))
		req.accept('echo-protocol')
	} else {
		logger.warn(message)
		req.reject(403, message)
	}
})

module.exports = register
