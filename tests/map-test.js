const ava = require('ava')

const genMapLayers = require('../src/mapGeneration')

ava('generate map layers', t => {
	const mapLayers = genMapLayers(5)
	t.is(mapLayers.floorLayer.length, 5)
	t.is(mapLayers.collisionLayer.length, 5)
	t.is(mapLayers.buildingLayer.length, 5)
})