const mongoose = require("mongoose");

// creating a user schema
const Song = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  track: {
    type: String,
    required: true,
  },
});

// create a model
const SongModel = mongoose.model("Song", Song);
module.exports = SongModel;
