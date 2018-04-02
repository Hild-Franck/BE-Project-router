const http = require('http')
const express = require('express')
const request = require('request-promise')
const bodyParser = require("body-parser")

const logger = require('../logger')
const createEvents = require('./events')

const authService = process.env.AUTH || "localhost"

const app = express()
app.use(bodyParser.json())

const port = process.env.PORT || 8080

const createHTTPServer = () => {
	const server = http.createServer(app)
	server.listen(port, () => logger.info(`Server is listening on port ${port}`))
	
	app.post('/register', ({ body }, res) => request({
		uri: `http://${authService}:4242/register`,
		method: "POST",
		body,
		json: true
	}).then(res.json))

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
