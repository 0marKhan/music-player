import React from "react";

import Divider from "@mui/material/Divider";

import SingleSongCard from "../UI/cards/SingleSongCard";
import "./Songs.css";

const Songs = () => {
  const dividerStyle = {
    borderColor: "#333",
    borderWidth: "1px",
    width: "90%",
    marginTop: "1rem",
  };

  return (
    <div className="songs-container">
      <div className="songs-title-section">
        <h1 className="songs-page-title">My Songs</h1>

        <div className="user-song-details">453 Songs, 62 hrs 50 mins</div>
        <Divider variant="middle" style={dividerStyle} />
      </div>
      <div className="songs-list">
        <SingleSongCard />
        <SingleSongCard />
        <SingleSongCard />
      </div>
    </div>
  );
};

export default Songs;
