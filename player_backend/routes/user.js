const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

router.post(
  "/liked-songs/add",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { songId } = req.body;

    try {
      const user = await User.findById(currentUser._id);

      // Check if song already exists in liked songs
      const isLiked = user.likedSongs.includes(songId);
      if (isLiked) {
        return res.status(400).json({ error: "Song already in liked songs" });
      }

      // Add song to liked songs
      await User.findByIdAndUpdate(currentUser._id, {
        $addToSet: { likedSongs: songId },
      });

      return res.status(200).json({ message: "Song added to liked songs" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Route to get all liked songs of a user
router.get(
  "/liked-songs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user; // Get the currently authenticated user

    try {
      // Fetch the user with liked songs populated
      const userWithLikedSongs = await User.findById(currentUser._id)
        .populate("likedSongs")
        .exec();

      // Send the liked songs in the response
      res.status(200).json(userWithLikedSongs.likedSongs);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
module.exports = router;
