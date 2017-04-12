const WebSocketServer = require('websocket').server
const http = require('http')

const port = process.env.PORT || 8080

const server = http.createServer((req, res) => {
    console.log(`Received connection for ${req.url}`)
    res.writeHead(404)
    res.end()
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
 
const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
})

module.exports = wsServer
