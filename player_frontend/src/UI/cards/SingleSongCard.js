import React, { useContext } from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";

import "./SingleSongCard.css";
import songContext from "../../contexts/songContext";

const SingleSongCard = ({ info, playSound }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);
  // checking if clicking the song changes the song to current song
  // console.log(currentSong);

  const backgroundImage = `url('${info.thumbnail}')`;

  return (
    // setting the current song to the song clicked
    <div className="song-card-container">
      <div className="song-card-main">
        {/* for display the play arrow when highlighted */}
        <div className="play-song-button" onClick={() => setCurrentSong(info)}>
          <PlayArrowIcon />
        </div>
        {/* for displaying the image with inline background style */}
        <div className="img-portion" style={{ backgroundImage }}></div>
        {/* for all the content like name, artist, duration, liked */}
        <div className="song-details">
          {/* for the name and artist of the song */}
          <div className="left-side-details">
            <div className="song-name">{info.name}</div>
            <div className="artist-name">{info.artist.username}</div>
          </div>
          <div className="right-side-details">
            <div className="liked-song-icon">
              <FavoriteBorderIcon />
            </div>
            <div className="duration">3:44</div>
            <div className="options-dots">
              <DeleteIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;
