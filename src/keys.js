const speed = 300

const updatePosition = {
	"left": (player, duration) => { player.x += (duration / 1000) * speed * -1 },
	"face": (player, duration) => {	player.y += (duration / 1000) * speed },
	"right": (player, duration) => { player.x += (duration / 1000) * speed },
	"back": (player, duration) => { player.y += (duration / 1000) * speed * -1 }
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
		return (new Error('Wrong key type'))
	}
	return keys
}


module.exports = createKeys 