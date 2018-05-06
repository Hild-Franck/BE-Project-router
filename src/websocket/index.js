const http = require('http')
const express = require('express')
const request = require('request-promise')
const cors = require('cors')
const bodyParser = require("body-parser")
const consola = require('consola')
const createEvents = require('./events')

const logger = consola.withScope('websocket')

const authService = process.env.AUTH || "localhost"

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 8080

const createHTTPServer = () => {
	const server = http.createServer(app)
	server.listen(port, () => logger.info(`Server is listening on port ${port}`))
	logger.info(`Forwarding registration request to ${authService}:4242`)
	app.post('/register', ({ body }, res) => {
		logger.info("Received a registration request")
		return request({
			uri: `http://${authService}:4242/register`,
			method: "POST",
			body,
			json: true
		}).then(data => {
			res.json(data)
			res.end()
		}).catch(({ message }) => {
			logger.error(message)
		})
	})

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
