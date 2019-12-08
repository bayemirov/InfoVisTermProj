var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  http = require('http'),
  fs = require('fs');

app.use(bodyParser.urlencoded({extended: true}));
//app.set("view engine", "ejs");

const PORT = 4001;

const poll = [
  {
    name: 'Chelsea',
    votes: 100,
  },
  {
    name: 'Arsenal',
    votes: 70,
  },
  {
    name: 'Liverpool',
    votes: 250,
  },
  {
    name: 'Manchester City',
    votes: 689,
  },
  {
    name: 'Manchester United',
    votes: 150,
  },
];

function renderView(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('./views/view.html', null, function(err, data) {
    if (err) {
      res.writeHead(404);
      res.write('File not found!');
    } else {
      res.render(data);
    }
    res.end();
  });
}

app.get("/", (req, res) => {
  //renderView(req, res);
  res.sendFile('./views/view.html');
});


app.listen(PORT, () => {
  console.log("Hello there!");
});
