
const wsConn = {
	check: {
		sendNumber: 0,
		firstMessage: "",
		secondMessage: "",
		thirdMessage: "",
		fourthMessage: "",
		fifthMessage: ""

	}
}

const wss = {
	connections: [{
		send: msg => {
			wsConn.check.sendNumber++
			if (wsConn.check.sendNumber == 3) {
				wsConn.check.thirdMessage = JSON.parse(msg).type
			} else if (wsConn.check.sendNumber == 5) {
				wsConn.check.fifthMessage = JSON.parse(msg).type
			}
		}
	}]
}

wsConn.send = msg => {
	wsConn.check.sendNumber++
	if (wsConn.check.sendNumber == 1) {
		wsConn.check.firstMessage = JSON.parse(msg).type
	} else if (wsConn.check.sendNumber == 2) {
		wsConn.check.secondMessage = JSON.parse(msg).type
	}  else if(wsConn.check.sendNumber == 4) {
		wsConn.check.fourthMessage = JSON.parse(msg).type
	}
},
wsConn.on = (type, callback) => {
	callback({ utf8Data: "{}" })
}


wss.connections.push(wsConn)

const authObj = { username: 'Poulet', id: '1a' }

module.exports = { wss, wsConn, authObj }
