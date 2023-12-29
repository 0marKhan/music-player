import React from "react";
import "./PlaylistCard.css";
import { Link } from "react-router-dom";

const PlaylistCard = ({ playlistData }) => {
  return (
    // <Link to={`/playlist/${playlistId}`}>
    <div className="card">
      <div className="image-container">
        <img src={playlistData.thumbnail} alt="Playlist image" />
      </div>
      <div className="card-content">
        <h2>{playlistData.name}</h2>
      </div>
    </div>
    // </Link>
  );
};

export default PlaylistCard;
