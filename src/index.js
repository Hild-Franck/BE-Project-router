const WebSocketServer = require('websocket').server

const createWebSocketServer = require('./websocket')

createWebSocketServer(WebSocketServer)
