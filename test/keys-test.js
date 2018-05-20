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

ava.serial('left key down', t => {
	keys.update({ type: 'downkey', data: 'left' }, player)
	t.is(keys["left"].start, 10)
	t.is(keys["left"].state, 'downkey')
})

ava.serial('face key down', t => {
	keys.update({ type: 'downkey', data: 'face' }, player)
	t.is(keys["face"].start, 10)
	t.is(keys["face"].state, 'downkey')
})

ava.serial('right key down', t => {
	keys.update({ type: 'downkey', data: 'right' }, player)
	t.is(keys["right"].start, 10)
	t.is(keys["right"].state, 'downkey')
})

ava.serial('back key down', t => {
	keys.update({ type: 'downkey', data: 'back' }, player)
	t.is(keys["back"].start, 10)
	t.is(keys["back"].state, 'downkey')
})

ava.serial('left key up', t => {
	keys.update({ type: 'upkey', data: 'left' }, player)
	t.is(keys["left"].duration, 15)
	t.is(keys["left"].state, 'upkey')
	t.is(player.x, -4.5)
})

ava.serial('face key up', t => {
	keys.update({ type: 'upkey', data: 'face' }, player)
	t.is(keys["face"].duration, 15)
	t.is(keys["face"].state, 'upkey')
	t.is(player.y, 4.5)
})

ava.serial('right key up', t => {
	keys.update({ type: 'upkey', data: 'right' }, player)
	t.is(keys["right"].duration, 15)
	t.is(keys["right"].state, 'upkey')
	t.is(player.x, 0)
})

ava.serial('back key up', t => {
	keys.update({ type: 'upkey', data: 'back' }, player)
	t.is(keys["back"].duration, 15)
	t.is(keys["back"].state, 'upkey')
	t.is(player.y, 0)
})

ava.serial('wrong key type', t => {
	const err = keys.update({ type: 'poulet', data: 'back' }, player)
	t.is(err.message, 'Wrong key type')
})
