const consola = require('consola')
const createOnRequestAccepted = require('./onRequestAccepted')
const authenticate = require('../../authenticate')

const logger = consola.withScope('websocket.onRequest')

const onRequest = wss => {
	const onRequestAccepted = createOnRequestAccepted(wss)
	return request => {
		const authObj = {
			username: request.resourceURL.query.username || '',
			password: request.resourceURL.query.password || ''
		}
		logger.info(`Received a registration request from ${authObj.username}`)

		if (!request.requestedProtocols.includes('echo-protocol')) {
			logger.warn(`Wrong protocol from ${authObj.username}, connection rejected`)
			request.reject()
			return false
		}

		authenticate(request, authObj, onRequestAccepted)
	}
}

module.exports = onRequest
