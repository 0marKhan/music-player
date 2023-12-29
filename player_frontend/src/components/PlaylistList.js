import React, { useEffect, useState } from "react";

import PlaylistCard from "../UI/cards/PlaylistCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import "./PlaylistList.css";

const PlaylistList = ({ addNewPlaylist }) => {
  const [myPlaylists, setMyPlaylists] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      // console.log(response.data);
      setMyPlaylists(response.data);
    };
    getData();
  }, [addNewPlaylist]);

  return (
    <div>
      {/* if i have atleast one playlist display this else dont */}
      {myPlaylists.length > 0 && (
        <div className="playlists-display">
          {myPlaylists.map((item) => (
            <PlaylistCard playlistData={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistList;
