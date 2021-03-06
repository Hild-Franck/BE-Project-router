const genFloorLayer = size => (new Array(size)).fill((new Array(size)).fill(0))

const genBuildingLayer = size => {
	const buildingLayer = (new Array(size)).fill((new Array(size)).fill(0))

	buildingLayer.forEach((array, idx) => {
		array[0] = 1
		array[array.length -1] = 1
	})
	return buildingLayer
}

const genMapLayers = size => {
	const mapLayers = {
		floorLayer: genFloorLayer(size),
		buildingLayer: genBuildingLayer(size)
	}
	mapLayers.collisionLayer = mapLayers.buildingLayer.slice()
	return mapLayers
}

module.exports = genMapLayers