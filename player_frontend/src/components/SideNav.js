import React from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

import "./SideNav.css";

const SideNav = ({ openCreatePlaylistModal }) => {
  return (
    <ul className="left-nav">
      <Link to="/search-songs">
        <li className="nav-item">
          <SearchIcon style={{ fontSize: "1rem" }} />
          <span className="nav-content">Search Songs</span>
        </li>
      </Link>
      <li className="nav-item" onClick={openCreatePlaylistModal}>
        <AddIcon style={{ fontSize: "1rem", fontWeight: "bolder" }} />
        <span className="nav-content">New Playlist</span>
      </li>
      <Link to="/add-song">
        <li className="nav-item">
          <AddIcon style={{ fontSize: "1rem", fontWeight: "bolder" }} />
          <span className="nav-content">Add Song</span>
        </li>
      </Link>
      <Link to="/liked-songs">
        <li className="nav-item">
          <FavoriteIcon style={{ fontSize: "1rem" }} />
          <span className="nav-content">Liked Songs</span>
        </li>
      </Link>
    </ul>
  );
};

export default SideNav;
