import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import BottomPlayerContainer from "../containers/BottomPlayerContainer";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
// import SingleSongCard from "../UI/cards/SingleSongCard";
import songContext from "../contexts/songContext";
import "./LikedSongs.css";

const LikedSongs = () => {
  const [likedSongsData, setLikedSongsData] = useState([]);

  const { setLikedSongs } = useContext(songContext);

  const dividerStyle = {
    borderColor: "#333",
    borderWidth: "1px",
    width: "90%",
    marginTop: "1rem",
  };

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/user/liked-songs");
        setLikedSongsData(response.data);
      } catch (error) {
        console.error("Error fetching liked songs:", error);
      }
    };

    fetchLikedSongs();
  }, [setLikedSongs]);

  return (
    <BottomPlayerContainer>
      <div className="addsong-header">
        <Link to="/home" className="home-link">
          <h3>Home</h3>
        </Link>
      </div>

      <div className="songs-container">
        <div className="songs-title-section">
          <h1 className="songs-page-title">My Liked Songs</h1>

          <div className="user-song-details">{likedSongsData.length} Songs</div>
          <Divider variant="middle" style={dividerStyle} />
        </div>

        {/* <div className="songs-list">
          {likedSongsData.map((item) => (
            <SingleSongCard info={item} key={item._id} playSound={() => {}} />
          ))}
        </div> */}
        <div className="fix-msg">
          Liked Songs functionality is currently under work
        </div>
      </div>

      <div className="bottom-nav">
        <SimpleBottomNavigation />
      </div>
    </BottomPlayerContainer>
  );
};

export default LikedSongs;
