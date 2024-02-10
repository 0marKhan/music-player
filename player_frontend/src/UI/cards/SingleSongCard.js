import React, { useContext } from "react";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import "./SingleSongCard.css";
import songContext from "../../contexts/songContext";
import { makeAuthenticatedPOSTRequest } from "../../utils/serverHelper";

const SingleSongCard = ({ info, playSound, handleDelete }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);
  // checking if clicking the song changes the song to current song
  console.log(currentSong);

  const backgroundImage = `url('${info.thumbnail}')`;

  // adding a song to liked songs

  const addToLikedSongs = async (info) => {
    try {
      const response = await makeAuthenticatedPOSTRequest(
        "/user/liked-songs/add",
        {
          songId: info._id,
        }
      );
      if (!response.error) {
        // Song successfully added to liked songs
        console.log("Song added to liked songs.");
        // You can add further UI changes here, like changing the color of the icon to indicate it's liked
      } else {
        console.error("Failed to add song to liked songs.");
      }
    } catch (error) {
      console.error("Error adding song to liked songs:", error);
    }
  };

  return (
    <div className="song-card-container">
      <div className="song-card-main">
        {/* for displaying the play arrow when highlighted */}
        {/* setting the current song to the song clicked */}
        <div className="play-song-button" onClick={() => setCurrentSong(info)}>
          <Tooltip title={`play ${info.name}`}>
            <PlayArrowIcon />
          </Tooltip>
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
            <div className="add-to-favourites">
              <Tooltip title="Add to Favourites">
                <AddCircleOutlineIcon
                  onClick={() => addToLikedSongs({ songId: info._id })}
                />
              </Tooltip>
            </div>
            <div className="options-dots">
              <Tooltip title="Delete Song">
                <DeleteIcon onClick={() => handleDelete(info._id)} />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;
