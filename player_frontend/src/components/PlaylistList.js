import React, { useEffect, useState } from "react";
import PlaylistCard from "../UI/cards/PlaylistCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import "./PlaylistList.css";
import { Link } from "react-router-dom";

const PlaylistList = ({ addNewPlaylist }) => {
  const [myPlaylists, setMyPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/playlist/get/me");
        setMyPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [addNewPlaylist]);

  return (
    <div>
      {loading ? (
        <div className="loading-placeholder">
          <LoadingPlaceholder />{" "}
        </div>
      ) : myPlaylists.length > 0 ? (
        <div className="playlists-display">
          {myPlaylists.map((item) => (
            <Link to={`/playlist-page/${item._id}`} key={item._id}>
              <PlaylistCard playlistData={item} />
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
