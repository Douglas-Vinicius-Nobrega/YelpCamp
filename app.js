const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

mongoose.connect(
  "mongodb+srv://dNvidia11:dNvidia11@yelp-camp.jljm3gs.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:")); // error checking
db.once("open", () => {
  console.log("Databse connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // viewing directory

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

app.get("/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/show", { campground });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
