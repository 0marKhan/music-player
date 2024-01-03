import React, { useState } from "react";

import "./AddSong.css";
import { Link } from "react-router-dom";
import TextInput from "../UI/common/TextInput";
import CloudinaryUpload from "../components/CloudinaryUpload";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
import BottomPlayerContainer from "../containers/BottomPlayerContainer";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";
import { ToastContainer, toast } from "react-toastify";

const AddSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState();

  const submitSong = async () => {
    const data = { name, thumbnail, track: playlistUrl };
    const response = await makeAuthenticatedPOSTRequest("/song/create", data);
    console.log(response);

    if (response._id) {
      toast.success("Song Added Successfully", {
        bodyClassName: "toastify-success",
        progressClassName: "toastify-progress-success",
      });
      // Reset state values after song creation
      setName("");
      setThumbnail("");
      setPlaylistUrl("");
      setUploadedSongFileName(null);
    } else {
      toast.error("Error adding song");
    }
  };

  const setNameHandler = (event) => {
    setName(event.target.value);
  };

  const setThumbnailHandler = (event) => {
    setThumbnail(event.target.value);
  };

  return (
    <>
      <ToastContainer />
      <BottomPlayerContainer>
        <div className="add-song-outer">
          <div className="addsong-header">
            <Link to="/home" className="home-link">
              <h3>Home</h3>
            </Link>
          </div>
          <div className="add-song-container">
            <h3 className="addsong-title">Upload your music</h3>
            <div className="addsong-boxes">
              <TextInput
                id="outlined-basic"
                label="Name"
                variant="outlined"
                style={{ margin: "1.5rem 0rem 0 0rem" }}
                value={name}
                onChange={setNameHandler}
              />
              <div className="thumbnail-box">
                <TextInput
                  id="outlined-basic"
                  label="Thumbnail URL"
                  variant="outlined"
                  style={{ margin: "1.5rem 0rem 0 0rem" }}
                  value={thumbnail}
                  onChange={setThumbnailHandler}
                />
              </div>
            </div>
            <div>
              {uploadedSongFileName ? (
                <div className="uploaded-song-name">
                  {uploadedSongFileName.length <= 35
                    ? uploadedSongFileName
                    : `${uploadedSongFileName.substring(0, 32)}...`}
                </div>
              ) : (
                <CloudinaryUpload
                  setUrl={setPlaylistUrl}
                  setName={setUploadedSongFileName}
                />
              )}
            </div>
            {uploadedSongFileName ? (
              <div>
                <button className="submit-song-button" onClick={submitSong}>
                  SUBMIT SONG
                </button>
              </div>
            ) : (
              <div></div>
            )}
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

export default AddSong;
