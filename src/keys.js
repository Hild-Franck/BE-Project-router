const createKeys = () => {
	const keys = {}

	keys.update = ({ type, data }) => {
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
		}
	}
	return keys
}

module.exports = createKeys 