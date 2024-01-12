import React, { useEffect, useState } from "react";

import Divider from "@mui/material/Divider";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import BottomPlayerContainer from "../containers/BottomPlayerContainer";
import { makeAuthenticatedDELETERequest } from "../utils/serverHelper";
import { ToastContainer, toast } from "react-toastify";

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

  // for getting user songs
  const getSongs = async () => {
    const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
    setSongData(response.data);
    // console.log(response.data);
  };

  useEffect(() => {
    getSongs();
  }, []);

  // for deleting a song
  const handleDelete = async (songId) => {
    try {
      const response = await makeAuthenticatedDELETERequest(
        `/song/delete/${songId}`
      );
      if (response.error) {
        toast.error("Error deleting song");
      } else {
        toast.success("Song deleted successfully", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // get the songs again when one is deleted to get updated list
        getSongs();
      }
    } catch (error) {
      console.error("Error deleting song:", error);
      toast.error("An error occurred while deleting the song");
    }
  };

  return (
    <>
      <ToastContainer />
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
              <SingleSongCard
                info={item}
                key={item._id}
                playSound={() => {}}
                handleDelete={handleDelete}
              />
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
