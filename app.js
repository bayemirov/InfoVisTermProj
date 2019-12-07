var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.send("Hi there! Welcome to my assignment!");
});

app.get("/:speak/:animal", function(req, res) {
	switch (req.params.animal) {
		case "pig":
			res.send("The pig says 'Oink'");
		case "cow":
			res.send("The cow says 'Wow'");
		case "dog":
			res.send("The dog says 'Woof! Woof!'");
		default:
			res.send("Sorry...");
	}
})

app.get("/repeat/:word/:number", function(req, res) {
	try {
		var number = req.params.number;
		var word = req.params.word;
		var result = "";
		for (var i = 0; i < number; i++) {
			result += word + ' ';
		}
		res.send(result);
	} catch (err) {
		res.send(err.message);
	}
})

app.get("*", function(req, res) {
	res.send("Sorry...");
})


app.listen(3000, process.env.IP, function() {
	console.log("Hello, I'm in Node now!");
});
