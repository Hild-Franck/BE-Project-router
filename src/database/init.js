const redis = require('redis')
const bluebird = require('bluebird')
const consola = require('consola')

const logger = consola.withScope('db.init')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const init = config => new Promise((resolve, reject) => {
	config.retry_strategy = options => {
		const err = `Unable to connect to redis: ${options.error.message}`
		if (options.attempt > config.maxRetry) {
			logger.error(err)
			reject(new Error(err))
			return undefined
		}
		return config.retryDelay
	}

	const client = redis.createClient(config)
	client.on('error', err => {
		logger.error(`Error on redis: ${err.message}`)
	})
	client.on('ready', ev => {
		logger.success('Connected to redis')
		resolve(client)
	})
})

module.exports = init
