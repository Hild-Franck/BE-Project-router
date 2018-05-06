const { configure, levels } = require('nightingale')
const ConsoleHandler = require('nightingale-console')

const setLogLevel = () => {
	configure([{
		handlers: [
			new ConsoleHandler.default(levels[process.env.LOG_LEVEL || "DEBUG"])
		]
	}])
}

module.exports = setLogLevel