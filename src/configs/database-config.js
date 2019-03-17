const dbConfig = {
	host: 'localhost',
	maxRetry: 5,
	retryDelay: 500
}

const env = process.env

// Override config with env
Object.keys(dbConfig).forEach(key => {
	const envKey = key.toUpperCase()
	if (env[envKey]) dbConfig[key] = env[envKey]
})

export default dbConfig