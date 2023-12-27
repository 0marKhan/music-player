import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilledTextInput from "../common/FilledTextInput";
import { Link } from "react-router-dom";
import "./TopSearchCard.css";

import froggy from "../../assets/images/froggy.jpg";

const TopSearchCard = () => {
  return (
    <>
      <div className="add-playlist-mobile">Add Playlist</div>
      <Link to="/add-song">
        <div className="add-song-mobile">Add Song</div>
      </Link>
      <div className="search-items">
        <div className="searchbox">
          <SearchIcon
            style={{
              color: "#fff",
              marginTop: "1.2rem",
              marginRight: "0.5rem",
            }}
          />
          <FilledTextInput
            id="standard"
            label="Search a playlist"
            variant="standard"
          />
        </div>
      </div>
      <div>
        <div className="circular-profile-image">
          <img src={froggy} alt="Froggy" />
        </div>
      </div>
    </>
  );
};

export default TopSearchCard;
