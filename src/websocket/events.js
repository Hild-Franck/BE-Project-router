const register = require('../register')
const unregister = require('../unregister')

const events = {
	onRequest: request => {
    console.log('Request received')
		const username = request.resourceURL.query.username || ''

		if (!request.requestedProtocols.includes('echo-protocol')) {
      console.log(`[${username}] Wrong protocol, connection rejected`)
      request.reject()
      return undefined
    }

    request.on('requestAccepted', wsConn =>
      events.onRequestAccepted(wsConn, username))

		return register(request, username)
	},
  onRequestAccepted: (wsConn, username) => {
    console.log(`Connection accepted for ${username}`)
    wsConn.on('close', err => {
      console.log(`Connection lose for ${username}`)
      unregister(username)
    })
  }

}

module.exports = events