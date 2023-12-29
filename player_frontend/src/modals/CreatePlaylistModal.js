import React, { useState } from "react";

import "./CreatePlaylistModal.css";
import TextInput from "../UI/common/TextInput";

import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";

const CreatePlaylistModal = ({ closeCreatePlaylistModal, addNewPlaylist }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState("");

  const setPlaylistNameHandler = (event) => {
    setPlaylistName(event.target.value);
  };

  const setPlaylistThumbnailHandler = (event) => {
    setPlaylistThumbnail(event.target.value);
  };

  const createPlaylist = async () => {
    const response = await makeAuthenticatedPOSTRequest("/playlist/create", {
      name: playlistName,
      thumbnail: playlistThumbnail,
      songs: [],
    });
    // close the modal if playlist is successfully created
    if (response._id) {
      closeCreatePlaylistModal();
      addNewPlaylist(response);
    }
  };

  // to insure the modal doesnt close when clicking on the form box
  const StopPropogation = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="modal-background" onClick={closeCreatePlaylistModal}>
      <div className="playlist-form" onClick={StopPropogation}>
        <h3 className="create-playlist-heading">Create Playlist</h3>
        <div>
          <TextInput
            id="outlined-basic"
            label="Playlist Name"
            variant="outlined"
            style={{ margin: "1.5rem 0rem 0 0rem" }}
            value={playlistName}
            onChange={setPlaylistNameHandler}
          />
        </div>
        <div>
          <TextInput
            id="outlined-basic"
            label="Thumbnail Link"
            variant="outlined"
            style={{ margin: "1.5rem 0rem 0 0rem" }}
            value={playlistThumbnail}
            onChange={setPlaylistThumbnailHandler}
          />
        </div>
        <div>
          <button className="create-playlist-button" onClick={createPlaylist}>
            CREATE PLAYLIST
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
