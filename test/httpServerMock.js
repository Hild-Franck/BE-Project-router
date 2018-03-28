const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())

app.post("/auth", (req, res) => {
	console.log(req.body)
	res.end()
})

app.listen(4242, function () {
	console.log("Listenning on 4242\n")
})