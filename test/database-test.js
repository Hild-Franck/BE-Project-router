const ava = require('ava')

const initRedis = require('../src/database/init')
const redis = require('../src/database/')
const players = require('../src/players')

const host = process.env.REDIS_HOST || 'localhost'

let database = {}
let db = {}
const testUser = { username: 'testUsername', id: "" }

ava('failed connection', t => {
	return initRedis({ maxRetry: 1, retryDelay: 5, host: 'wrongHost' }).catch(err => {
		t.pass()
	})
})

ava.before(t => {
	return initRedis({ maxRetry: 5, retryDelay: 500, host }).then(newDb => {
		database = newDb
	})
})

ava.before(t => {
	return redis.init()
})

ava('connected to redis', t => {
	t.is(database.connected, true)
})

ava('create database object', t => {
	t.truthy(redis.storeNewPlayer)
})

ava.after(t => {
	database.del(testUser.username)
})