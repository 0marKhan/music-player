import React from "react";

import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./SideNav.css";

const SideNav = ({ onNewPlaylistClick }) => {
  return (
    <ul className="left-nav">
      <li className="nav-item">
        <HomeIcon style={{ fontSize: "1rem" }} />
        <span className="nav-content">Home</span>
      </li>
      <li className="nav-item" onClick={onNewPlaylistClick}>
        <AddIcon style={{ fontSize: "1rem", fontWeight: "bolder" }} />
        <span className="nav-content">New Playlist</span>
      </li>
      <li className="nav-item">
        <FavoriteIcon style={{ fontSize: "1rem" }} />
        <span className="nav-content">Liked Songs</span>
      </li>
    </ul>
  );
};

export default SideNav;
