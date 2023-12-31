import React, { useEffect, useState } from "react";

import Divider from "@mui/material/Divider";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import BottomPlayerContainer from "../containers/BottomPlayerContainer";

import SingleSongCard from "../UI/cards/SingleSongCard";
import "./Songs.css";
import { Link } from "react-router-dom";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";

const Songs = () => {
  const [songData, setSongData] = useState([]);

  const dividerStyle = {
    borderColor: "#333",
    borderWidth: "1px",
    width: "90%",
    marginTop: "1rem",
  };

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
      setSongData(response.data);
      // console.log(response.data);
    };

    getData();
  }, []);

  return (
    <>
      <BottomPlayerContainer>
        <div className="addsong-header">
          <Link to="/home" className="home-link">
            <h3>Home</h3>
          </Link>
        </div>

        <div className="songs-container">
          <div className="songs-title-section">
            <h1 className="songs-page-title">My Songs</h1>

            <div className="user-song-details">{songData.length} Songs</div>
            <Divider variant="middle" style={dividerStyle} />
          </div>

          <div className="songs-list">
            {songData.map((item) => (
              <SingleSongCard info={item} key={item._id} playSound={() => {}} />
            ))}
          </div>
        </div>
        {/* for phone view */}
        <div className="bottom-nav">
          <SimpleBottomNavigation />
        </div>
      </BottomPlayerContainer>
    </>
  );
};

export default Songs;
