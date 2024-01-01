import React, { useState } from "react";
import "./SearchSong.css";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import TextInput from "../UI/common/TextInput";
import SingleSongCard from "../UI/cards/SingleSongCard";
import BottomPlayerContainer from "../containers/BottomPlayerContainer";
import { Link } from "react-router-dom";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";

const SearchSong = () => {
  const [searchSongData, setSearchSongData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const setSearchTextHandler = (event) => {
    setSearchText(event.target.value);
  };

  // for calling the search api
  const searchSong = async () => {
    const response = await makeAuthenticatedGETRequest(
      "/song/get/songname/" + searchText
    );
    setSearchSongData(response.data);
  };
  return (
    <BottomPlayerContainer>
      <div className="search-song-header">
        <Link to="/home" className="home-link">
          <h3>Home</h3>
        </Link>
      </div>
      <div className="search-songs">
        <div className="search-songs-inputs">
          <div className="search-song-box">
            <TextInput
              id="outlined-basic"
              label="Search for a song"
              variant="outlined"
              style={{ margin: "1.5rem 0rem 0 0rem" }}
              value={searchText}
              onChange={setSearchTextHandler}
            />
          </div>
          <div className="search-song-button-container">
            <button className="search-song-button" onClick={searchSong}>
              SEARCH SONG
            </button>
          </div>
        </div>
        {searchSongData.length > 0 ? (
          <div className="search-song-list">
            <p className="search-result-text">
              Showing results for &nbsp;{" "}
              <span className="search-text-bold"> "{searchText}"</span>
            </p>
            {searchSongData.map((item) => (
              <SingleSongCard info={item} playSound={() => {}} />
            ))}
          </div>
        ) : (
          <p className="default-show-text">
            Nothing to show here, try entering a song to search it
          </p>
        )}
      </div>
      {/* for phone view */}
      <div className="bottom-nav">
        <SimpleBottomNavigation />
      </div>
    </BottomPlayerContainer>
  );
};

export default SearchSong;
