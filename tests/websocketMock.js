
const wsConn = {
	check: {
		sendNumber: 0
	}
}

const wss = {
	connections: [{
		send: msg => wsConn.check.sendNumber++
	}]
}

wsConn.send = msg => {
	wsConn.check.sendNumber++
},
wsConn.on = (type, callback) => {}


wss.connections.push(wsConn)

const authObj = { username: 'Poulet', id: '1a' }

module.exports = { wss, wsConn, authObj }
