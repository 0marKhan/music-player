import React from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";

import "./LikedSongsPlaylist.css";

const LikedSongsPlaylist = () => {
  return (
    <div className="liked-songs-card">
      <div className="liked-songs-card-content">
        <FavoriteIcon />
        <h2 className="liked-songs-title">Liked Songs</h2>
      </div>
    </div>
  );
};

export default LikedSongsPlaylist;
