import React, { useState } from "react";
import Lottie from "lottie-react";

import "./Home.css";

import BottomPlayerContainer from "../containers/BottomPlayerContainer";
import LikedSongsPlaylist from "../UI/cards/LikedSongsPlaylist";
import SideNav from "../components/SideNav";
import TopSearchCard from "../UI/cards/TopSearchCard";

import animations from "../assets/lottefiles/animation.json";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation";
import PlaylistList from "../components/PlaylistList";
import SongsCard from "../UI/cards/SongsCard";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";

const LoggedInHome = () => {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);

  const addNewPlaylist = (newPlaylist) => {
    console.log(newPlaylist);
  };

  const openCreatePlaylistModal = () => {
    setCreatePlaylistModalOpen(true);
  };

  const closeCreatePlaylistModal = () => {
    setCreatePlaylistModalOpen(false);
  };

  return (
    <BottomPlayerContainer>
      {/* modal for creating playlist */}
      {/* only display the modal if the createPlaylistModalOpen is true */}
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeCreatePlaylistModal={closeCreatePlaylistModal}
          addNewPlaylist={addNewPlaylist}
        />
      )}

      <div className="upper-page-portion">
        <div className="search-playlist">
          <TopSearchCard openCreatePlaylistModal={openCreatePlaylistModal} />
        </div>
        <div className="nav-card-container">
          <div className="nav-side">
            <SideNav openCreatePlaylistModal={openCreatePlaylistModal} />
          </div>
          <div className="cards-side">
            <div className="playlist-container">
              <div className="songs-card-container">
                <SongsCard />
              </div>

              <div className="playlists">
                <PlaylistList addNewPlaylist={addNewPlaylist} />
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
          {/* for phone view */}
          <div className="bottom-nav">
            <SimpleBottomNavigation />
          </div>
        </div>
      </div>
    </BottomPlayerContainer>
  );
};

export default LoggedInHome;
