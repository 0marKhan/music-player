import React, { useEffect, useState } from "react";

import PlaylistCard from "../UI/cards/PlaylistCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import "./PlaylistList.css";
import { Link } from "react-router-dom";

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
      {myPlaylists.length > 0 ? (
        <div className="playlists-display">
          {myPlaylists.map((item) => (
            <Link to={`/playlist-page/${item._id}`}>
              <PlaylistCard playlistData={item} key={item._id} />
            </Link>
          ))}
        </div>
      ) : (
        <h3 className="no-playlists-msg">
          Create a new playlist to start adding songs to it
        </h3>
      )}
    </div>
  );
};

export default PlaylistList;
