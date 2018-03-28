const http = require('http')
const logger = require('../logger')

const createEvents = require('./events')

const port = process.env.PORT || 8080

const createHTTPServer = () => {
	const server = http.createServer((req, res) => {
		res.writeHead(404)
		res.end()
	})

	server.listen(port, () => logger.info(`Server is listening on port ${port}`))
	return server
}

const createWebSocketServer = WebSocketServer => {
	const httpServer = createHTTPServer()

	const wsServer = new WebSocketServer({
		httpServer,
		autoAcceptConnections: false
	})

	const events = createEvents(wsServer)

	wsServer.on('request', events.onRequest)
}


module.exports = createWebSocketServer
