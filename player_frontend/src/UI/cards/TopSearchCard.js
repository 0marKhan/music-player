import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import "./TopSearchCard.css";
import songContext from "../../contexts/songContext";

const TopSearchCard = ({ openCreatePlaylistModal }) => {
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const { setCurrentSong, setSoundPlayed, setIsPaused } =
    useContext(songContext);

  const logout = () => {
    // Remove the 'token' cookie when logging out
    removeCookie("token");
    setCurrentSong(null);
    setSoundPlayed(null);
    setIsPaused(null);
  };

  return (
    <>
      <div className="add-playlist-mobile" onClick={openCreatePlaylistModal}>
        Add Playlist
      </div>
      <Link to="/add-song">
        <div className="add-song-mobile">Add Song</div>
      </Link>

      <div className="logout-btn-container">
        <div className="logout-btn" onClick={logout}>
          Log Out
        </div>
      </div>
    </>
  );
};

export default TopSearchCard;
