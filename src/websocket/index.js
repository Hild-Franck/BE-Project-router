const http = require('http')

const createEvents = require('./events')

const port = process.env.PORT || 8080

const createHTTPServer = () => {
	const server = http.createServer((req, res) => {
    console.log(`Received connection for ${req.url}`)
    res.writeHead(404)
    res.end()
	})

	server.listen(port, () => console.log(`Server is listening on port ${port}`))
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
