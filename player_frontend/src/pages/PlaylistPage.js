import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import BottomPlayerContainer from "../containers/BottomPlayerContainer";
import "./PlaylistPage.css";
import "./Songs.css";
import {
  makeAuthenticatedDELETERequest,
  makeAuthenticatedGETRequest,
} from "../utils/serverHelper";
import { Divider } from "@mui/material";
import SingleSongCard from "../UI/cards/SingleSongCard";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";

import DeleteIcon from "@mui/icons-material/Delete";

const PlaylistPage = () => {
  const [playlistDetails, setPlaylistDetails] = useState({});
  const { playlistId } = useParams();

  const navigate = useNavigate();

  const dividerStyle = {
    borderColor: "#333",
    borderWidth: "1px",
    width: "90%",
    marginTop: "1rem",
  };

  // function to delete a playlist

  const handleDelete = async () => {
    try {
      await makeAuthenticatedDELETERequest(
        "/playlist/delete/playlist/" + playlistId
      );
      navigate("/home");
    } catch (error) {
      console.error("Error deleting playlist:", error);
      // Handle the error appropriately in your UI
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/playlist/get/playlist/" + playlistId
      );
      setPlaylistDetails(response);
    };
    getData();
  });

  let songList = null;

  if (playlistDetails.songs && Array.isArray(playlistDetails.songs)) {
    // the list to display all the songs
    songList = (
      <div className="songs-container">
        <div className="songs-title-section">
          <div className="image-title">
            <div className="playlist-thumbnail">
              <img src={playlistDetails.thumbnail} alt="thumbnail" />
            </div>
            <h1 className="playlist-page-title">{playlistDetails.name}</h1>
          </div>
          <div className="user-song-details">
            {playlistDetails.songs && playlistDetails.songs.length} songs
          </div>
          <Divider variant="middle" style={dividerStyle} />
        </div>

        <div className="songs-list">
          {playlistDetails.songs.map((item) => (
            <SingleSongCard info={item} playSound={() => {}} />
          ))}
        </div>
      </div>
    );
  }

  // when loading to prevent the BottomPlayerContainer to not jump to top
  const placeholder = (
    <div className="songs-container">
      <div className="songs-title-section">
        <div className="image-title">
          <div className="playlist-thumbnail"></div>
        </div>
        <div className="user-song-details">songs</div>
        <Divider variant="middle" style={dividerStyle} />
      </div>
    </div>
  );

  return (
    <BottomPlayerContainer>
      <div className="addsong-header">
        <Link to="/home" className="home-link">
          <h3>Home</h3>
        </Link>
        <div className="delete-playlist-button" onClick={handleDelete}>
          <DeleteIcon />
        </div>
      </div>

      {/* renders the song list conditionally if a playlist.id exists */}
      {playlistDetails._id ? songList : placeholder}
      {/* for phone view */}
      <div className="bottom-nav">
        <SimpleBottomNavigation />
      </div>
    </BottomPlayerContainer>
  );
};

export default PlaylistPage;
