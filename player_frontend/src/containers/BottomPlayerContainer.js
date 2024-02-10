import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Howl } from "howler";

import "../pages/Home.css";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";

import FavoriteToggleIcon from "../components/FavoriteToggleIcon";
import Tooltip from "@mui/material/Tooltip";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

import songContext from "../contexts/songContext";

import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
import { useCookies } from "react-cookie";

const BottomPlayerContainer = ({ children }) => {
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  // for the liking and unliking songs
  const [isSongLiked, setIsSongLiked] = useState(false);

  // gets the current value of song from context
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);

  // code for checking if logged out to stop playing song and set context to null
  const [cookies] = useCookies(["token"]); // Retrieve token cookie
  useEffect(() => {
    if (!cookies.token) {
      soundPlayed.stop();
      setCurrentSong(null);
      setSoundPlayed(null);
      setIsPaused(null);
      soundPlayed.stop();
    }
  }, [cookies.token, soundPlayed, setCurrentSong, setSoundPlayed, setIsPaused]);

  const openAddToPlaylistModal = () => {
    setAddToPlaylistModalOpen(true);
  };

  const closeAddToPlaylistModal = () => {
    setAddToPlaylistModalOpen(false);
  };

  const firstUpdate = useRef(true);

  // checks when current song changes then triggers changeSong function
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong && currentSong.track]);

  ////////////////////////////////////////////////////// API CALLS HERE ////////////////////////////////////////////////////////////////////////////////

  // Toggle like/unlike for a song
  const toggleSongLike = async () => {
    const songId = currentSong._id;
    try {
      const response = await makeAuthenticatedPOSTRequest(
        "/user/liked-songs/toggle",
        { songId }
      );
      setIsSongLiked(response.isLiked); // Update state based on response
    } catch (error) {
      console.error("Error toggling song like:", error);
    }
  };

  // for adding the song to playlist
  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;
    const payload = { playlistId, songId };

    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    // closes the modal when the song is added
    if (response._id) {
      closeAddToPlaylistModal();
    }
  };

  //////////////////////////////////////////////////////// HOWLER.JS LOGIC HERE ///////////////////////////////////////////////////////////////////////////////////////////

  const playSound = () => {
    // first checks if there is a valid soundPlayed instance in the useState
    if (!soundPlayed) {
      return;
    }
    // if it does plays the song, and sets pause to false
    soundPlayed.play();
    setIsPaused(false); // Update the pause state when playing
  };

  // stops the current playing audio and creates a new howl instance
  // starts playing the new howl instance
  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
      onload: function () {
        // Access the duration once the audio file is loaded
        const duration = sound.duration();
        console.log("Duration:", duration);
      },
    });
    setSoundPlayed(sound);
    sound.play();
    // Update the pause state when changing the song
    setIsPaused(false);
  };

  // Update the pause state when pausing
  const pauseSound = () => {
    soundPlayed.pause();
    setIsPaused(true);
  };

  const togglePlayPause = () => {
    if (!soundPlayed) {
      return;
    }
    if (isPaused) {
      playSound();
    } else {
      pauseSound();
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="main-container">
      {/* modal for adding to a playlist */}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          addSongToPlaylist={addSongToPlaylist}
          closeAddToPlaylistModal={closeAddToPlaylistModal}
        />
      )}
      {children}
      {/* conditionally render the bottom audio bar if there is a current song*/}
      {currentSong && (
        <div className="lower-page-portion">
          <div className="first-portion-bottom">
            <img
              className="lower-portion-img"
              src={currentSong.thumbnail}
              alt="current song thumbnail"
            />
            <div className="lower-portion-details">
              <div className="song-name-bottom">{currentSong.name}</div>
              <div className="artist-name-bottom">
                {currentSong.artist.username}
              </div>
            </div>
            <div className="liked-song-icon-bottom">
              <div className="liked-container">
                <FavoriteToggleIcon
                  isLiked={isSongLiked}
                  onClick={toggleSongLike}
                />
              </div>
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
            {/* <div>Progress Bar</div> */}
          </div>
          <div className="third-portion-bottom">
            <div className="add-playlist-button">
              <Tooltip title="Add to a Playlist">
                <PlaylistAddIcon onClick={openAddToPlaylistModal} />
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomPlayerContainer;
