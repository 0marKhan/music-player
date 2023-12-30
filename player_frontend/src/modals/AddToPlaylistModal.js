import React, { useEffect, useState } from "react";

import "./AddToPlaylistModal.css";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import AddToPlaylistCard from "../UI/cards/AddToPlaylistCard";

const AddToPlaylistModal = ({ closeAddToPlaylistModal, addSongToPlaylist }) => {
  const [myPlaylists, setMyPlaylists] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // getting all playlists
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      // console.log(response.data);
      setMyPlaylists(response.data);
    };
    getData();
  }, []);
  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="modal-background" onClick={closeAddToPlaylistModal}>
      <div className="playlist-form" onClick={stopPropagation}>
        <h3 className="add-to-playlist-heading">Add to Playlist</h3>

        <div className="playlists-displayed-in-modal">
          {myPlaylists.map((item) => (
            <AddToPlaylistCard
              key={item.id}
              playlistData={item}
              addSongToPlaylist={addSongToPlaylist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
