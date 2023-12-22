import React, { useState } from "react";

import LinkToMp3 from "../components/LinkToMp3";

import "./AddSong.css";

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

const AddSong = () => {
  const youtubeLink = "https://youtu.be/oyQ1i-czPcE?si=wXXHBCOu4AXvTdtm"; // Example link
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    copyToClipboard(youtubeLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <div className="add-song-container">
      <div>
        <div>
          <LinkToMp3 />
        </div>

        <div className="add-song-description">
          <p className="add-song-text">
            Enter a valid YouTube link, like the example link below for a video
            to convert it into audio and add it to your songs list.
          </p>
          <p
            className="add-song-text"
            onClick={handleCopyClick}
            style={{ cursor: "pointer" }}
          >
            <span className="copyable-link">
              {copied ? "Copied!" : youtubeLink}
            </span>
          </p>
          <p className="add-song-text">
            Only YouTube links are supported at the moment. Ensure the link is
            accessible and contains a playable video.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddSong;
