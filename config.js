module.exports = {
	redis: {
		host: process.env.REDIS_HOST,
		maxRetry: 5,
		retryDelay: 500
	}
}