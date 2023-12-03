const mongoose = require("mongoose");

// creating a user schema
const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },

  likedSongs: {
    type: String,
    default: "", // means start as empty
  },
});

// create a model
const UserModel = mongoose.model("User", User);
module.exports = UserModel;
