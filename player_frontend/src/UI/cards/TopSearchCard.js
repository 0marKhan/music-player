import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilledTextInput from "../common/FilledTextInput";
import "./TopSearchCard.css";
import froggy from "../../assets/images/froggy.jpg";
import AddIcon from "@mui/icons-material/Add";

const TopSearchCard = ({ onNewPlaylistClick }) => {
  return (
    <>
      <div className="add-playlist-mobile" onClick={onNewPlaylistClick}>
        <AddIcon style={{ color: "#999", fontSize: "2.5rem" }} />
      </div>
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
