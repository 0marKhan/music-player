import React from "react";
import "./PlaylistCard.css";
import { Link } from "react-router-dom";

const PlaylistCard = ({ image, title, playlistId }) => {
  return (
    <Link to={`/playlist-home/${playlistId}`}>
      <div className="card">
        <div className="image-container">
          <img src={image} alt={title} />
        </div>
        <div className="card-content">
          <h2>{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistCard;
