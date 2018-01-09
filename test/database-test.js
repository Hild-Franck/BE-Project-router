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
	return initRedis({ maxRetry: 5, retryDelay: 500, host }).then(db => {
		database = db
	})
})

ava('connected to redis', t => {
	t.is(database.connected, true)
})

ava.before(t => {
	return redis.then(newDb => {
		db = newDb
	})
})

ava.serial('auth an empty username', t => {
	return db.auth('').catch(err => {
		t.is(err.message, 'Empty username')
	})
})

ava.serial('auth a new user', t => {
	return db.auth(testUser).then(player => {
		testUser.id = player.id
		t.is(player.username, testUser.username)
	})
})

ava.serial('auth ingame username', t => {
	return database.hsetAsync(testUser, 'stuff', 0).then(() => {
		return db.auth(testUser).catch(err => {
			t.is(err.message, 'Username already used')
		})
	})
})

ava.serial('auth existing username', t => {
	players.remove(testUser.id)
	return db.auth(testUser).then(player => {
		t.is(player.username, testUser.username)
	})
})

ava.after(t => {
	database.del(testUser.username)
})