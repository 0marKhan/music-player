const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

outer.post(
  "/liked-songs/add",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user; // Get the currently authenticated user
    const { songId } = req.body;

    try {
      // Assuming 'likedSongs' is an array field in your User schema
      await User.findByIdAndUpdate(currentUser._id, {
        $addToSet: { likedSongs: songId }, // Add the songId to the 'likedSongs' array if it doesn't exist already
      });

      return res.status(200).json({ message: "Song added to liked songs" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
