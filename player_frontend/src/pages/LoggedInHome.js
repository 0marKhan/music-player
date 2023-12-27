import React, { useState } from "react";
import Lottie from "lottie-react";
import { Howl, Howler } from "howler";

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

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

const LoggedInHome = () => {
  const [playlistId, setPlaylistId] = useState(1);
  const [playlists, setPlaylists] = useState([
    { id: 1, image: PlaceholderPlaylistImage, title: "Chad Squirtle" },
    // { id: 2, image: PlaceholderPlalistImage2, title: "Hooodie shoodie" },
    // { id: 3, image: Froggy, title: "Froggumus Maximus" },
  ]);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

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

  const playSound = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound(
        "https://res.cloudinary.com/decgdudjl/video/upload/v1703629371/cbrvhbjzcsywfpnml5x7.mp3"
      );
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  return (
    <div className="main-container">
      <div className="upper-page-portion">
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
                <SongsCard />
                <PlaylistList
                  addNewPlaylist={addNewPlaylist}
                  playlistCount={playlistId}
                  playlists={playlists}
                />
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
      </div>
      {/* this is for playing the current song */}
      <div className="lower-page-portion">
        <div className="first-portion-bottom">
          <img
            className="lower-portion-img"
            src="https://f4.bcbits.com/img/a3756253541_65"
            alt="current song thumbnail"
          />
          <div className="lower-portion-details">
            <div className="song-name-bottom">Death Card Cabin</div>
            <div className="artist-name-bottom">Omar Khan</div>
          </div>
        </div>
        <div className="second-portion-bottom">
          <div className="bottom-controls">
            <div className="prev-btn">
              <SkipPreviousIcon style={{ fontSize: "2rem" }} />
            </div>
            <div className="play-btn" onClick={togglePlayPause}>
              {isPaused ? (
                <PlayCircleIcon
                  style={{
                    fontSize: "2.2rem",
                  }}
                />
              ) : (
                <PauseCircleIcon
                  style={{
                    fontSize: "2.2rem",
                  }}
                />
              )}
            </div>
            <div className="next-btn">
              <SkipNextIcon style={{ fontSize: "2rem" }} />
            </div>
          </div>
          <div>Progress Bar</div>
        </div>
        <div className="third-portion-bottom"></div>
      </div>
    </div>
  );
};

export default LoggedInHome;
