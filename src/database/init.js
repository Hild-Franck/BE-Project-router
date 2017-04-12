const redis = require('redis')
const bluebird = require('bluebird')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const init = config => new Promise((resolve, reject) => {
	config.retry_strategy = options => {
		const err = `Unable to connect to redis: ${options.error.message}`
		if (options.attempt > config.maxRetry) {
			console.log(err)
			reject(new Error(err))
			return undefined
		}
		return config.retryDelay
	}

	const client = redis.createClient(config)
	client.on('error', err => {
		console.log(`Error on redis: ${err.message}`)
	})
	client.on('ready', ev => {
		console.log('Connected to redis')
		resolve(client)
	})
})

module.exports = init
