const winston = require('winston')
const dateformat = require('dateformat')
const chalk = require("chalk")

const config = winston.config
const env = process.env.NODE_ENV
const colors = {
	info: chalk.cyan,
	warn: chalk.yellow,
	error: chalk.red
}
const colorize = (level, string) => colors[level](string)

winston.level = (env === 'production' || env === 'staging')
	? 'info'
	: 'debug'

const logger = new(winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			timestamp: () => dateformat(Date.now(), "dd/mm/yyyy HH:MM:ss.l"),
			formatter: options => {
				meta = (options.meta && Object.keys(options.meta).length)
					? "\t" + JSON.stringify(options.meta)
					: ""
				return colorize(options.level,
					`[${options.level.toUpperCase()}]\t` +
					`${options.timestamp()}\t` +
					`${options.message}` +
					`${meta}`
				)
			}
		})
	]
})

module.exports = logger