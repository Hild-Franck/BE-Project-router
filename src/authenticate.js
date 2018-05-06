const request = require('request-promise')
const consola = require('consola')

const logger = consola.withScope('authenticate')

const authService = process.env.AUTH || "localhost"

const register = (req, authObj, onRequestAccepted) => {
	logger.info("Received an authentication request")
	return request({
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
	}).catch(({ message }) => {
		logger.error(message)
	})
}

module.exports = register
