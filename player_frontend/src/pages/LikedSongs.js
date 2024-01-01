import React from "react";

import "./LikedSongs.css";
import BottomPlayerContainer from "../containers/BottomPlayerContainer";
import { Link } from "react-router-dom";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";

const LikedSongs = () => {
  return (
    <BottomPlayerContainer>
      <div className="addsong-header">
        <Link to="/home" className="home-link">
          <h3>Home</h3>
        </Link>
      </div>
      <div className="placeholder-text">
        <h1>Currently Working on this page</h1>
      </div>
      {/* for phone view */}
      <div className="bottom-nav">
        <SimpleBottomNavigation />
      </div>
    </BottomPlayerContainer>
  );
};

export default LikedSongs;
