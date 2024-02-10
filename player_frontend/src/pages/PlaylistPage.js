import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import BottomPlayerContainer from "../containers/BottomPlayerContainer";
import "./PlaylistPage.css";
import "./Songs.css";
import {
  makeAuthenticatedDELETERequest,
  makeAuthenticatedGETRequest,
} from "../utils/serverHelper";
import { Divider, Tooltip } from "@mui/material";
import SingleSongCard from "../UI/cards/SingleSongCard";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";
import { ToastContainer, toast } from "react-toastify";

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

  // API CALLS HERE
  // function to delete a playlist

  const handleDeletePlaylist = async () => {
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

  // for getting playlist songs
  const getPlaylistSongs = async () => {
    const response = await makeAuthenticatedGETRequest(
      "/playlist/get/playlist/" + playlistId
    );
    setPlaylistDetails(response);
  };

  // for deleting a song
  const handleDelete = async (songId) => {
    try {
      const response = await makeAuthenticatedDELETERequest(
        `/song/delete/${songId}`
      );
      if (response.error) {
        toast.error("Error deleting song");
      } else {
        toast.success("Song deleted successfully", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // get the songs again when one is deleted to get updated list
        getPlaylistSongs();
      }
    } catch (error) {
      console.error("Error deleting song:", error);
      toast.error("An error occurred while deleting the song");
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
            <SingleSongCard
              info={item}
              playSound={() => {}}
              handleDelete={handleDelete}
            />
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
    <>
      <ToastContainer />
      <BottomPlayerContainer>
        <div className="addsong-header">
          <Link to="/home" className="home-link">
            <h3>Home</h3>
          </Link>
          <div
            className="delete-playlist-button"
            onClick={handleDeletePlaylist}
          >
            <Tooltip title="Delete Playlist">
              <DeleteIcon />
            </Tooltip>
          </div>
        </div>

        {/* renders the song list conditionally if a playlist.id exists */}
        {playlistDetails._id ? songList : placeholder}
        {/* for phone view */}
        <div className="bottom-nav">
          <SimpleBottomNavigation />
        </div>
      </BottomPlayerContainer>
    </>
  );
};

export default PlaylistPage;
