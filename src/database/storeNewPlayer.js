const storeNewPlayer = db => playerData => {
	db.hmsetAsync(playerData.username,
		"id", playerData.id,
		"x", playerData.x,
		"y", playerData.y)
}

module.exports = storeNewPlayer