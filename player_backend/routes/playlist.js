const express = require("express");
const passport = require("passport");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");

const router = express.Router();

// creating a playlist
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail || !songs) {
      return res.status(301).json({ err: "Insufficient data" });
    }
    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: currentUser._id,
      collaborators: [],
    };
    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
  }
);

// getting a playlist by id
router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // gets the dynamic value from the playlistId variable
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({ _id: playlistId }).populate({
      path: "songs",
      populate: {
        path: "artist",
      },
    });
    if (!playlist) {
      return res.status(301).json({ err: "Invalid Id" });
    }
    return res.status(200).json(playlist);
  }
);

// Get all playlists created by the currently logged-in user
router.get(
  "/user/playlists",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentUser = req.user; // Get the currently authenticated user
      const playlists = await Playlist.find({ owner: currentUser._id });

      if (!playlists || playlists.length === 0) {
        return res
          .status(304)
          .json({ err: "No playlists found for this user" });
      }

      return res.status(200).json({ playlists });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Get all playlists made by me
// /get/me
router.get(
  "/get/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.user._id;

    const playlists = await Playlist.find({ owner: artistId }).populate(
      "owner"
    );
    return res.status(200).json({ data: playlists });
  }
);

// add a song to a playlist

router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user; // Get the currently authenticated user
    const { playlistId, songId } = req.body;

    try {
      const playlist = await Playlist.findOne({ _id: playlistId });

      if (!playlist) {
        return res.status(404).json({ err: "Playlist does not exist" });
      }

      // Check if current user owns the playlist or is a collaborator
      if (
        playlist.owner.toString() !== currentUser._id.toString() &&
        !playlist.collaborators.some(
          (collaborator) =>
            collaborator.toString() === currentUser._id.toString()
        )
      ) {
        return res.status(403).json({ err: "Not allowed" });
      }

      const song = await Song.findOne({ _id: songId });

      if (!song) {
        return res.status(404).json({ err: "Song not found" });
      }

      playlist.songs.push(songId);
      await playlist.save();

      return res.status(200).json({ playlist });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
