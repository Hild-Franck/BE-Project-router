const createOnRequestAccepted = require('./onRequestAccepted')
const register = require('../../register')

const onRequest = wss => {
  const onRequestAccepted = createOnRequestAccepted(wss)
    return request => {
    console.log('Request received')
  	const autObj = {
      username: request.resourceURL.query.username || '',
      id: ''
    }

  	if (!request.requestedProtocols.includes('echo-protocol')) {
      console.log(`[${autObj.username}] Wrong protocol, connection rejected`)
      request.reject()
      return false
    }

    request.on('requestAccepted', wsConn =>
      onRequestAccepted(wsConn, autObj))
      
    register(request, autObj)
  }
}

module.exports = onRequest
