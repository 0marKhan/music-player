import React from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import "./SingleSongCard.css";

const SingleSongCard = () => {
  return (
    <div className="song-card-container">
      <div className="song-card-main">
        {/* for display the play arrow when highlighted */}
        <div className="play-song-button">
          <PlayArrowIcon />
        </div>
        {/* for displaying the image */}
        <div className="img-portion"></div>
        {/* for all the content like name, artist, duration, liked */}
        <div className="song-details">
          {/* for the name and artist of the song */}
          <div className="left-side-details">
            <div className="song-name">7th Element</div>
            <div className="artist-name">Vitas</div>
          </div>
          <div className="right-side-details">
            <div className="liked-song-icon">
              <FavoriteBorderIcon />
            </div>
            <div className="duration">3:44</div>
            <div className="options-dots">
              <MoreHorizIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;
