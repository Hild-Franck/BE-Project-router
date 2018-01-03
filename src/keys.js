const speed = 300

const updatePosition = {
	"65": (player, duration) => { player.x += (duration / 1000) * speed * -1 },
	"83": (player, duration) => {	player.y += (duration / 1000) * speed },
	"68": (player, duration) => { player.x += (duration / 1000) * speed },
	"87": (player, duration) => { player.y += (duration / 1000) * speed * -1 },
}

const createKeys = () => {
	const keys = {}

	keys.update = ({ type, data }, player) => {
		if (type === 'downkey') {
			keys[data] = {
				start: (new Date()).getTime(),
				state: type,
				duration: 0
			}
		} else if (type === 'upkey') {
			const key = keys[data]
			key.state = type
			key.duration = (new Date()).getTime() - key.start
			updatePosition[data](player, key.duration)
		}
	}
	return keys
}


module.exports = createKeys 