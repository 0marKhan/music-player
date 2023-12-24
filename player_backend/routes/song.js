const express = require("express");
const passport = require("passport");
const Song = require("../models/Song");

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { name, track } = req.body;

      if (!name || !track) {
        return res
          .status(400)
          .json({ error: "Insufficient details to create song" });
      }

      const songDetails = { name, track };
      const createdSong = await Song.create(songDetails);

      return res.status(201).json(createdSong);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create song" });
    }
  }
);

// get route to a single song by name
router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songName } = req.params;
    const songs = await Song.find({ name: songName });
    return res.status(200).json({ data: songs });
  }
);

// Get route to get all songs I have published.
router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // We need to get all songs where artist id == currentUser._id
    const songs = await Song.find({ artist: req.user._id }).populate("artist");
    return res.status(200).json({ data: songs });
  }
);

module.exports = router;
