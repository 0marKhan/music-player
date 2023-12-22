import React from "react";

import MusicNoteIcon from "@mui/icons-material/MusicNote";

import "./SongsCard.css";
import { Link } from "react-router-dom";

const SongsCard = () => {
  return (
    <Link to="/songs">
      <div className="songs-card">
        <div className="songs-card-content">
          <MusicNoteIcon />
          <h2 className="songs-title">Songs</h2>
        </div>
      </div>
    </Link>
  );
};

export default SongsCard;
