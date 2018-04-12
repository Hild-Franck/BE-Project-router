const http = require('http')
const express = require('express')
const request = require('request-promise')
const cors = require('cors')
const bodyParser = require("body-parser")

const logger = require('../logger')
const createEvents = require('./events')

const authService = process.env.AUTH || "localhost"

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 8080

const createHTTPServer = () => {
	const server = http.createServer(app)
	server.listen(port, () => logger.info(`Server is listening on port ${port}`))
	
	app.post('/register', ({ body }, res) => request({
		uri: `http://${authService}:4242/register`,
		method: "POST",
		body,
		json: true
	}).then(data => {
		res.json(data)
		res.end()
	}))

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
