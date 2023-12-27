import React, { useEffect, useState } from "react";
import { Howl, Howler } from "howler";

import Divider from "@mui/material/Divider";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";

import SingleSongCard from "../UI/cards/SingleSongCard";
import "./Songs.css";

const Songs = () => {
  const dividerStyle = {
    borderColor: "#333",
    borderWidth: "1px",
    width: "90%",
    marginTop: "1rem",
  };

  const [songData, setSongData] = useState([]);
  const [soundPlayed, setSoundPlayed] = useState(null);

  const playSound = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
  };

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
      // console.log(response.data);
      setSongData(response.data);
      console.log(response.data);
    };

    getData();
  }, []);

  return (
    <div className="songs-container">
      <div className="songs-title-section">
        <h1 className="songs-page-title">My Songs</h1>

        <div className="user-song-details">453 Songs, 62 hrs 50 mins</div>
        <Divider variant="middle" style={dividerStyle} />
      </div>
      <div className="songs-list">
        {songData.map((item) => (
          <SingleSongCard info={item} playSound={playSound} />
        ))}
      </div>
    </div>
  );
};

export default Songs;
