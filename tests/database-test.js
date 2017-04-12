const ava = require('ava')

const initRedis = require('../src/database/init')
const redis = require('../src/database/')

const host = process.env.REDIS_HOST || 'localhost'

let database = {}
let db = {}
const usernameTest = 'usernameTest'

ava.cb('failed connection', t => {
	initRedis({ maxRetry: 1, retryDelay: 5, host: 'wrongHost' }).catch(err => {
		t.pass()
		t.end()
	})
})

ava.cb.before(t => {
	initRedis({ maxRetry: 5, retryDelay: 500, host }).then(db => {
		database = db
		t.end()
	})
})

ava.cb('connected to redis', t => {
	t.is(database.connected, true)
	t.end()
})

ava.cb.before(t => {
	redis.then(newDb => {
		db = newDb
		t.end()
	})
})

ava.cb('auth an empty username', t => {
	db.auth('').catch(err => {
		t.is(err.message, 'Empty username')
		t.end()
	})
})

ava.cb('auth existing username', t => {
	database.hsetAsync(usernameTest, 'stuff', 0).then(() => {
		db.auth(usernameTest).catch(err => {
			t.is(err.message, 'Username already used')
			t.end()
		})
	})
})

ava.cb('auth username', t => {
	db.auth('test').then(result => {
		console.log(result)
		t.pass()
		t.end()
	})
})