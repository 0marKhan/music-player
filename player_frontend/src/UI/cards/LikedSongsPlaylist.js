import React from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";

import "./LikedSongsPlaylist.css";
import { Link } from "react-router-dom";

const LikedSongsPlaylist = () => {
  return (
    <Link to="/liked-songs">
      <div className="liked-songs-card">
        <div className="liked-songs-card-content">
          <FavoriteIcon />
          <h2 className="liked-songs-title">Liked Songs</h2>
        </div>
      </div>
    </Link>
  );
};

export default LikedSongsPlaylist;
