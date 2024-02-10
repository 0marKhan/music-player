const mongoose = require("mongoose");

// creating a user schema
const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
  username: {
    type: String,
    required: true,
  },

  likedSongs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

// create a model
const UserModel = mongoose.model("User", User);
module.exports = UserModel;
