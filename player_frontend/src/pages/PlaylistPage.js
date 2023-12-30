import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BottomPlayerContainer from "../containers/BottomPlayerContainer";
import "./PlaylistPage.css";
import "./Songs.css";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import { Divider } from "@mui/material";
import SingleSongCard from "../UI/cards/SingleSongCard";

const PlaylistPage = () => {
  const [playlistDetails, setPlaylistDetails] = useState({});
  const { playlistId } = useParams();

  const dividerStyle = {
    borderColor: "#333",
    borderWidth: "1px",
    width: "90%",
    marginTop: "1rem",
  };

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/playlist/get/playlist/" + playlistId
      );
      setPlaylistDetails(response);
    };
    getData();
  }, []);

  let songList = null;

  if (playlistDetails.songs && Array.isArray(playlistDetails.songs)) {
    // the list to display all the songs
    songList = (
      <div className="songs-container">
        <div className="songs-title-section">
          <div className="image-title">
            <div className="playlist-thumbnail">
              <img src={playlistDetails.thumbnail} />
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

  return (
    <BottomPlayerContainer>
      <div className="addsong-header">
        <Link to="/home" className="home-link">
          <h3>Home</h3>
        </Link>
      </div>

      {/* renders the song list conditionally if a playlist.id exists */}
      {playlistDetails._id && songList}
    </BottomPlayerContainer>
  );
};

export default PlaylistPage;
