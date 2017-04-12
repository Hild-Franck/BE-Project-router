const register = require('./register')

const events = {
	onRequest: request => {
		const username = request.resourceURL.query.username || ''
		if (!request.requestedProtocols.includes('echo-protocol')) {
      request.reject()
      logger.warn(`[${username}] Wrong protocol, connection rejected`)
      return undefined
    }

    request.on('requestAccepted', wsConnection => {
      onRequestAccepted(wsConnection, username)
    })
	}

	register(username)
}

module.exports = events