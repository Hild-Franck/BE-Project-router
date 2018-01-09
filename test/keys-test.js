const ava = require('ava')

const createKeys = require('../src/keys')

// Mock Date object
let count = 0
Date = function() {
	this.getTime = () => {
		count++
		return (count <= 4) ? 10 : 25
	}
}

const keys = createKeys()
const player = { x: 0, y: 0 }

ava.serial('65 key down', t => {
	keys.update({ type: 'downkey', data: '65' }, player)
	t.is(keys["65"].start, 10)
	t.is(keys["65"].state, 'downkey')
})

ava.serial('83 key down', t => {
	keys.update({ type: 'downkey', data: '83' }, player)
	t.is(keys["83"].start, 10)
	t.is(keys["83"].state, 'downkey')
})

ava.serial('68 key down', t => {
	keys.update({ type: 'downkey', data: '68' }, player)
	t.is(keys["68"].start, 10)
	t.is(keys["68"].state, 'downkey')
})

ava.serial('87 key down', t => {
	keys.update({ type: 'downkey', data: '87' }, player)
	t.is(keys["87"].start, 10)
	t.is(keys["87"].state, 'downkey')
})

ava.serial('65 key up', t => {
	keys.update({ type: 'upkey', data: '65' }, player)
	t.is(keys["65"].duration, 15)
	t.is(keys["65"].state, 'upkey')
	t.is(player.x, -4.5)
})

ava.serial('83 key up', t => {
	keys.update({ type: 'upkey', data: '83' }, player)
	t.is(keys["83"].duration, 15)
	t.is(keys["83"].state, 'upkey')
	t.is(player.y, 4.5)
})

ava.serial('68 key up', t => {
	keys.update({ type: 'upkey', data: '68' }, player)
	t.is(keys["68"].duration, 15)
	t.is(keys["68"].state, 'upkey')
	t.is(player.x, 0)
})

ava.serial('87 key up', t => {
	keys.update({ type: 'upkey', data: '87' }, player)
	t.is(keys["87"].duration, 15)
	t.is(keys["87"].state, 'upkey')
	t.is(player.y, 0)
})

ava.serial('wrong key type', t => {
	const err = keys.update({ type: 'poulet', data: '87' }, player)
	t.is(err.message, 'Wrong key type')
})
