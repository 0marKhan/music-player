import React, { useState } from "react";
import "./PlaylistList.css";
import PlaylistCard from "../UI/cards/PlaylistCard";

const PlaylistList = (props) => {
  if (props.playlistCount === 0) {
    return (
      <div>
        <h2 className="no-playlist-message">No Playlists found</h2>
      </div>
    );
  }

  return (
    <>
      {props.playlists.map((playlist, index) => (
        <PlaylistCard
          key={`playlist-${index}`}
          image={playlist.image}
          title={playlist.title}
          playlistId={index + 1}
        />
      ))}
    </>
  );
};

export default PlaylistList;
