const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())

let authenticated = true

app.post("/auth", (req, res) => {
	console.log(req.body)
	authenticated = !authenticated
	if (authenticated) {
		res.json({ validation: false, message: "Already authenticated" })
	} else {
		res.json({
			validation: true,
			message: "Authentication succeed",
			playerData: {
				x: 0,
				y: 0,
				username: "Poulet"
			}
		})
	}
	res.end()
})

app.listen(4242, function () {
	console.log("Listenning on 4242\n")
})