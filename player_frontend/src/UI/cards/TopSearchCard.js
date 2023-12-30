import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import "./TopSearchCard.css";

const TopSearchCard = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const logout = () => {
    // Remove the 'token' cookie when logging out
    removeCookie("token");
    // You might want to redirect the user to the login page or perform other actions after logout
  };

  return (
    <>
      <div className="add-playlist-mobile">Add Playlist</div>
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
