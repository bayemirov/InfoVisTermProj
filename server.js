var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  d3 = require('d3'),
  jsdom = require('jsdom');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  d3.select(jsdom.jsdom().body).append('p').text('Paragraph');
});

app.listen(3000, () => {
  console.log("Hello there!");
});