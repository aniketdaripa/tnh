const express = require("express");
const mongoose = require("mongoose");

// Connect to the MongoDB database
// mongoose.connect("mongodb+srv://aniket1:hianiket123@cluster0.z69mafx.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true });
async function main() {
    await mongoose.connect('mongodb+srv://aniket1:hianiket123@cluster0.z69mafx.mongodb.net/?retryWrites=true&w=majority');
  }
// Define the schema for the footprint data
const FootprintSchema = new mongoose.Schema({
  url: String,
  footprint: Number
});

// Compile the schema into a model
const Footprint = mongoose.model("Footprint", FootprintSchema);

// Create a new express app
const app = express();

// Save a new footprint data to the database
app.post("/", (req, res) => {
  Footprint.create({
    url: req.body.url,
    footprint: req.body.footprint
  }, (err, footprint) => {
    if (err) {
      res.send(err);
    } else {
      res.json(footprint);
    }
  });
});

// Get all the footprint data from the database
app.get("/", (req, res) => {
  Footprint.find({}, (err, footprints) => {
    if (err) {
      res.send(err);
    } else {
      res.json(footprints);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});