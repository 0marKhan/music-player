import React, { useState } from "react";
import Lottie from "lottie-react";

import "./Home.css";

import LikedSongsPlaylist from "../UI/cards/LikedSongsPlaylist";
import SideNav from "../components/SideNav";
import TopSearchCard from "../UI/cards/TopSearchCard";

import PlaylistPlaceholderImage from "../assets/images/music-placeholder.jpg";
import PlaceholderPlaylistImage from "../assets/images/placeholder-playlist-img.jpg";

import animations from "../assets/lottefiles/animation.json";

import SimpleBottomNavigation from "../components/SimpleBottomNavigation";
import PlaylistList from "../components/PlaylistList";
import SongsCard from "../UI/cards/SongsCard";

const LoggedInHome = () => {
  const [playlistId, setPlaylistId] = useState(1);
  const [playlists, setPlaylists] = useState([
    { id: 1, image: PlaceholderPlaylistImage, title: "Chad Squirtle" },
  ]);

  const addNewPlaylist = () => {
    const newId = playlistId + 1;
    setPlaylistId(newId);

    const newPlaylist = {
      id: newId,
      image: PlaylistPlaceholderImage,
      title: `Playlist ${newId}`,
    };

    setPlaylists([...playlists, newPlaylist]);
  };

  return (
    <div className="main-container">
      <div className="search-playlist">
        <TopSearchCard onNewPlaylistClick={addNewPlaylist} />
      </div>
      <div className="nav-card-container">
        <div className="nav-side">
          <SideNav onNewPlaylistClick={addNewPlaylist} />
        </div>
        <div className="cards-side">
          <div className="playlist-container">
            <div className="playlists">
              <PlaylistList
                addNewPlaylist={addNewPlaylist}
                playlistCount={playlistId}
                playlists={playlists}
              />
              <SongsCard />
            </div>
          </div>
          <div>
            <div className="liked-songs-container">
              <div className="liked-songs">
                <LikedSongsPlaylist />
                <div className="lotte-anime">
                  <Lottie
                    animationData={animations}
                    loop={true}
                    autoplay={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="instructions">
          <h2 className="instructions-heading">How it works</h2>
          <p className="instruction-text">
            Add media files, in the "Add Song" section, which you can then add
            to your playlist or liked songs
          </p>
        </div>
        <div className="bottom-nav">
          <SimpleBottomNavigation onNewPlaylistClick={addNewPlaylist} />
        </div>
      </div>

      {/* for entering youtube link and converting it */}
      {/* <LinkToMp3 /> */}
    </div>
  );
};

export default LoggedInHome;
