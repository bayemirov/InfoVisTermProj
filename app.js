var express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var Campgrounds = mongoose.model("Campground", campgroundSchema);

app.get("/", (req, res) => {
  res.render("landing");
});


// INDEX - show the list of all campgrounds
app.get("/campgrounds", (req, res) => {
  Campgrounds.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", {campgrounds: campgrounds});
    }
  });
});


// CREATE - Add a new campground to DB
app.post("/campgrounds", (req, res) => {
  var newCampground = {
    name: req.body.name,
    image: req.body.image,
    city: req.body.city
  };
  Campgrounds.create(newCampground, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("campgrounds");
    }
  });
});

// NEW - Displays a form to make a new campground
app.get("/campgrounds/new", (req, res) => {
  res.render("newCampground");
});

app.listen(3000, () => {
  console.log("Hello there!");
});